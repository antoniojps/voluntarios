import gql from 'graphql-tag';
import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../../models/user';
import { secure, StatusError } from './../utils/filters';
import { v1 as uuidv1 } from 'uuid';

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

export const typeDef = gql`
  type User {
    _id: ID!
    email: String! @auth(requires: owner)
    username: String
    admin: Boolean
    moderator: Boolean
    verified: Boolean
    verifiedAt: DateTime
    verificationTokenSentAt: DateTime
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input VerifyEmailInput {
    verificationToken: String!
  }

  extend type Query {
    user(id: ID!): User!
    users: [User]!
    currentUser: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
    signOut: Boolean!
    verifyEmail(input: VerifyEmailInput!): User!
  }
`;

async function createUser(data) {
  const salt = bcrypt.genSaltSync();
  const newUser = {
    email: data.email,
    password: bcrypt.hashSync(data.password, salt),
    verified: false,
    verificationToken: uuidv1(),
    verificationTokenSentAt: Date.now()
  };

  const savedUser = await User.createUser(newUser);
  // send verification token
  return savedUser
}

function login(user, context) {
  const { _id, email, admin, moderator } = user;
  const token = jwt.sign({ id: _id, email, admin, moderator }, JWT_SECRET, {
    expiresIn: '6h',
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 6 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );
}

function logout(context) {
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

export const resolvers = {
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

      const { _id, email, admin, moderator } = user;
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
    verifyEmail: secure(async (_parent, args, context) => {
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
