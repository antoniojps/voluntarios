import gql from 'graphql-tag';
import { AuthenticationError } from 'apollo-server-micro';
import User from './../../models/user';
import Category from './../../models/category';
import { secure, StatusError } from './../utils/filters';
import { createUser, login, logout, isValidPassword } from './../utils/user';

export const typeDef = gql`
  type User {
    _id: ID!
    email: String!
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
  }

  type UserPage {
    list: [User]
    pageInfo: PaginationInfo!
  }

  enum OrderFields {
    createdAt
  }

  enum Sort {
    asc
    desc
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

  input UserInput {
    _id: ID!
    email: String!
    firstName: String
    lastName: String
    description: String
    name: String
    job: String
    categories: [ID!]
    locations: LocationInput
    admin: Boolean
    moderator: Boolean
    verified: Boolean
    verifiedAt: DateTime
    verificationTokenSentAt: DateTime
    createdAt: DateTime
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
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    categories: [ID!]
    locations: [LocationInput!]
    job: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input VerifyEmailInput {
    verificationToken: String!
  }

  extend type Query {
    # (User) User by id
    user(id: ID!): User
    # (User) Authenticated user
    currentUser: User
    # All users paginated with filters
    users(input: UsersFilterInput!, pagination: PaginationInput): UserPage
  }

  extend type Mutation {
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
    signOut: Boolean!
    verifyEmail(input: VerifyEmailInput!): User!
    updateUser(input: UserInput!): User!
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
    users: async (root, { input, pagination = {} }) =>
      User.searchByFilters({ input, pagination }),
  },
  Mutation: {
    signUp: async (_parent, args, context) => {
      const user = await createUser(args.input);
      login(user, context);
      return user;
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
    updateUser: secure(async (root, { input }) => {
      try {
        await User.findOneAndUpdate(
          {
            _id: input._id,
          },
          {
            $set: input,
          },
        );
      } catch (e) {
        if (process.env !== 'production') throw new Error(e.message);
        throw Error('Error updating user');
      }
    }),
    signOut: async (_parent, _args, context) => {
      logout(context);
      return true;
    },
    verifyEmail: secure(async (_parent, args) => {
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
    }),
  },
};
