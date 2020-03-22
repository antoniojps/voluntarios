import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../../models/user';

import { v1 as uuidv1 } from 'uuid';

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

export async function createUser(data) {
  const salt = bcrypt.genSaltSync();
  const locations = data.locations.length > 0
    ? data.locations.map(location => ({
      name: location.name,
      geolocation: {
        type: 'Point',
        coordinates: [location.geolocation.long, location.geolocation.lat],
      },
    }))
    : []
  const newUser = {
    email: data.email,
    password: bcrypt.hashSync(data.password, salt),
    firstName: data.firstName,
    lastName: data.lastName,
    name: `${data.firstName} ${data.lastName}`,
    categories: data.categories,
    locations,
    job: data.job,
    verified: false,
    verificationToken: uuidv1(),
    verificationTokenSentAt: Date.now(),
  };
  const savedUser = await User.createUser(newUser);
  // send verification token
  return savedUser
}

export function login(user, context) {
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
    }),
  );
}

export function logout(context) {
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
}

export function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}