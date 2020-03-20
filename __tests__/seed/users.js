import { ObjectID } from 'mongodb';
import User from './../../models/user';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const userThreeID = new ObjectID();
const userFourID = new ObjectID();

const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = process.env;

export function generateAuthToken({ id, email }, admin, moderator) {
  const token = jsonwebtoken
    .sign(
      {
        id,
        email,
        admin: !!admin,
        moderator: !!moderator,
      },
      JWT_SECRET,
      {
        expiresIn: '24h',
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: id,
      },
    )
    .toString();
  return token;
}

const salt = bcrypt.genSaltSync();

export const defaultUsers = {
  admin: {
    _id: userOneID,
    email: 'userOne@mail.com',
    username: 'admin',
    password: bcrypt.hashSync('123', salt),
  },
  moderator: {
    _id: userThreeID,
    email: 'userThree@mail.com',
    username: 'moderator',
    password: bcrypt.hashSync('123', salt),
  },
  normal: {
    _id: userTwoID,
    email: 'userTwo@mail.com',
    username: 'normal',
    password: bcrypt.hashSync('123', salt),
  },
  normalAlt: {
    _id: userFourID,
    email: 'userFour@mail.com',
    username: 'normalFour',
    password: bcrypt.hashSync('123', salt),
  },
};

export const usersTokens = {
  admin: generateAuthToken(
    {
      id: defaultUsers.admin._id.toHexString(),
      email: defaultUsers.admin.email,
    },
    true,
  ),
  moderator: generateAuthToken(
    {
      id: defaultUsers.moderator._id.toHexString(),
      email: defaultUsers.moderator.email,
    },
    false,
    true,
  ),
  normal: generateAuthToken({
    id: defaultUsers.normal._id.toHexString(),
    email: defaultUsers.normal.email,
  }),
  normalAlt: generateAuthToken({
    id: defaultUsers.normalAlt._id.toHexString(),
    email: defaultUsers.normalAlt.email,
  }),
};

export const populateUsers = () => {
  return new Promise((resolve, reject) => {
    User.deleteMany({})
      .then(() => {
        const createUsers = Object.keys(defaultUsers).map(key =>
          new User(defaultUsers[key]).save(),
        );
        Promise.all(createUsers).then(() => {
          resolve();
        });
      })
      .catch(err => reject(err));
  });
};
