import gql from 'graphql-tag';
import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import User from './../../models/user';
import Category from './../../models/category';
import { secure, StatusError } from './../utils/filters';
import { createUser, login, logout, isValidPassword } from './../utils/user';

export const typeDef = gql`
  type User {
    _id: ID!
    email: String! @auth(requires: owner)
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
  }

  type Location{
    _id: ID!
    name: String!
    geolocation: Geolocation!
  }

  input LocationInput {
    name: String!
    geolocation: GeolocationInput!
  }

  type Geolocation{
    lat: Float!
    long: Float!
  }

  input GeolocationInput{
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
    user(id: ID!): User
    users: [User]
    currentUser: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
    signOut: Boolean!
    verifyEmail(input: VerifyEmailInput!): User!
  }
`;

export const resolvers = {
  User: {
    categories: ({ categories }) => Category.find({ '_id': { $in: categories } }),
    locations: ({ locations }) => locations.toObject().map(location => {
      return {
        ...location,
        geolocation: {
          long: location.geolocation.coordinates[0],
          lat: location.geolocation.coordinates[1],
        },
      }
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
  },
  Mutation: {
    signUp: async (_parent, args, context) => {
      const user = await createUser(args.input);
      login(user, context);
      return user;
    },

    signIn:  async  (_parent, args, context) => {
      const user = await User.findByEmail(args.input.email);
      if (!user) throw new AuthenticationError('User not found');

      if (user && isValidPassword(user, args.input.password)) {
        login(user, context);
        return user;
      }
      throw new UserInputError('Invalid email and password combination');
    },
    signOut: async (_parent, _args, context) => {
      logout(context);
      return true;
    },
    verifyEmail: secure(async (_parent, args) => {
      const { verificationToken } = args.input
      const user = await User.findOne({verificationToken});
      if (!user) throw new StatusError(422, 'Invalid activation token.');
      try {
        user.verify()
        await user.save()
        return user
      } catch (e) {
        if (process.env !== 'production') throw new Error(e.message)
        throw Error('Error verifying email');
      }
    }),
  },
};
