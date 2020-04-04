import gql from 'graphql-tag';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import User from './../../models/user';
import Category from './../../models/category';
import { secure, secureUserOnly, StatusError } from './../utils/filters';
import { createUser, login, logout, isValidPassword, generateLocation } from './../utils/user';
import { sendVerificationEmail } from 'services/email'
import { ObjectID } from 'mongodb'
import { slugRegex } from 'services/contants'

export const typeDef = gql`
  type User {
    _id: ID!
    email: EmailAddress! @auth(requires: owner)
    firstName: String!
    lastName: String!
    name: String!
    job: String
    categories: [Category]
    locations: [Location]
    admin: Boolean
    moderator: Boolean
    verified: Boolean
    verifiedAt: DateTime
    verificationTokenSentAt: DateTime
    createdAt: DateTime
    avatar: Avatar
    slug: String
  }

  enum OrderFields {
    createdAt
  }

  enum Sort {
    asc
    desc
  }

  enum Face {
    Calm
	  Cute
	  Smile
  }

  enum FacialHair {
    None
    Full
    FullMajestic
    GoateeCircle
    Handlebars
    MajesticHandlebars
  }

  enum Hair {
    Afro
    Bald
    Bangs
    BangsFilled
    Bun
    FlatTop
    Long
    Medium
    Mohawk
    Pomp
    ShavedSides
    ShortVolumed
    ShortWavy
    BunFancy
  }

  enum Accessories {
    None
    SunglassClubmaster
    GlassButterfly
    GlassRound
  }

  type Avatar {
    illustration: Illustration
    image: Image
  }

  input AvatarInput {
    illustration: IllustrationInput
    image: ImageInput
  }

  type Illustration {
    accessory: Accessories!
    face: Face!
    hair: Hair!
    facialHair: FacialHair!
  }

  input IllustrationInput {
    accessory: Accessories!
    face: Face!
    hair: Hair!
    facialHair: FacialHair!
  }

  type Image {
    small: URL!
    medium: URL!
    large: URL!
  }

  input ImageInput {
    small: String!
    medium: String!
    large: String!
  }

  type UserPage {
    list: [User]
    pageInfo: PaginationInfo!
  }

  input OrderByInput {
    field: OrderFields!
    sort: Sort!
  }

  input UsersFilterInput {
    name: String = ""
    geolocation: GeolocationInput
    categories: [ID!]
    orderBy: OrderByInput
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    name: String
    description: String
    job: String
    categories: [ID!]
    locations: [LocationInput!]
  }

  type Location {
    _id: ID!
    name: String!
    geolocation: Geolocation!
  }

  input LocationInput {
    name: String!
    geolocation: GeolocationInput!
  }

  type Geolocation {
    lat: Float!
    long: Float!
  }

  input GeolocationInput {
    lat: Float!
    long: Float!
  }

  input SignUpInput {
    email: EmailAddress!
    password: String!
    firstName: String!
    lastName: String!
    categories: [ID!]
    locations: [LocationInput!]
    job: String
  }

  input SignInInput {
    email: EmailAddress!
    password: String!
  }

  input VerifyEmailInput {
    verificationToken: String!
  }

  input SlugInput {
    slug: String!
  }

  extend type Query {
    # (User) User by id
    user(id: ID!): User
    # (User) User by slug (id or username)
    userBySlug(slug: String!): User
    # (User) Authenticated user
    currentUser: User
    # All users paginated with filters
    users(input: UsersFilterInput!, pagination: PaginationInput): UserPage
  }

  extend type Mutation {
    # Sign up new user
    signUp(input: SignUpInput!): User!
    # Sign in user
    signIn(input: SignInInput!): User!
    # Sign out user
    signOut: Boolean!
    # (Owner) Verify email address
    verifyEmail(input: VerifyEmailInput!): User!
    # (Owner) Update user
    updateUser(userId: ID!, input: UserUpdateInput!): User!
    # (Owner) Update user avatar
    updateAvatar(userId: ID!, input: AvatarInput!): User!
    # (Owner) Update user slug
    updateSlug(userId: ID!, input: SlugInput!): User!
  }
`;

export const resolvers = {
  User: {
    categories: ({ categories }) => Category.find({ _id: { $in: categories } }),
    locations: ({ locations }) =>
      locations.toObject().map(location => {
        return {
          ...location,
          geolocation: {
            long: location.geolocation.coordinates[0],
            lat: location.geolocation.coordinates[1],
          },
        };
      }),
  },
  Query: {
    currentUser: secure(async (_parent, _args, context) => {
      const user = await User.findByEmail(context.req.user.email);
      if (!user) {
        logout(context);
        throw new AuthenticationError('User not found');
      }
      return user;
    }),
    user: (root, { id }) => User.findById(id),
    userBySlug: (root, { slug }) => User.findBySlug(slug),
    users: async (root, { input, pagination = {} }) =>
      User.searchByFilters({ input, pagination }),
  },
  Mutation: {
    signUp: async (_parent, args, context) => {
      try {
        const alreadyExists = await User.findByEmail(args.input.email)
        if (alreadyExists) throw new Error('409');
        const user = await createUser(args.input);
        login(user, context);
        const { email: to, verificationToken, name } = user;
        await sendVerificationEmail({ to, token: verificationToken, name })
        return user;
      } catch (err) {
        if (err.message === '409') throw new StatusError(409, 'Email already in use');
        else throw new ApolloError(err)
      }
    },
    signIn: async (_parent, args, context) => {
      const user = await User.findByEmail(args.input.email);
      if (!user) throw new StatusError(404, 'User not found');

      if (user && isValidPassword(user, args.input.password)) {
        login(user, context);
        return user;
      }
      throw new StatusError(401, 'Invalid email and password combination');
    },
    signOut: async (_parent, _args, context) => {
      logout(context);
      return true;
    },
    verifyEmail: async (_parent, args) => {
      const { verificationToken } = args.input;
      const user = await User.findOne({ verificationToken });
      if (!user) throw new StatusError(422, 'Invalid activation token.');
      try {
        user.verify();
        await user.save();
        return user;
      } catch (e) {
        if (process.env !== 'production') throw new Error(e.message);
        throw Error('Error verifying email');
      }
    },
    updateUser: secureUserOnly(async (root, { userId, input: dirtyInput }) => {
      let input = dirtyInput
      if (input.locations && input.locations.length > 0) {
        input.locations = generateLocation(input.locations)
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          input,
          { new: true },
        );
        return updatedUser
      } catch (e) {
        if (process.env !== 'production') throw new Error(e.message);
        throw Error('Error updating user');
      }
    }),
    updateSlug: secureUserOnly(async (root, { userId, input }) => {
      try {
        const slug = input.slug.toLowerCase()
        const slugValid = slugRegex.test(slug)
        if (!slugValid) throw new Error('400');
        const userWithSlug = await User.findOne({ slug })
        if (
          userWithSlug
          && ObjectID(userWithSlug._id).toString() !== ObjectID(userId).toString()
        ) throw new Error('409');
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            slug,
          },
          { new: true },
        );
        return updatedUser
      } catch (err) {
        if (err.message === '400') throw new StatusError(400, 'Slug invalid');
        if (err.message === '409') throw new StatusError(409, 'Slug already in use');
        else throw new ApolloError(err)
      }
    }),
    updateAvatar: secureUserOnly(async (root, { userId, input }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          { avatar: input },
          { new: true },
        );
        return updatedUser
      } catch (e) {
        if (process.env !== 'production') throw new Error(e.message);
        throw Error('Error updating user');
      }
    }),
  },
};
