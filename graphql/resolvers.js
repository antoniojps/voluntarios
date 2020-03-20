import merge from 'lodash.merge';
import { resolvers as UserResolvers } from './schemas/user';

import {
  DateTimeResolver,
  PositiveIntResolver,
  EmailAddressResolver,
  URLResolver,
} from 'graphql-scalars';
import jsonScalar from 'graphql-type-json';

const setupResolvers = {
  // scalars
  DateTime: DateTimeResolver,
  PositiveInt: PositiveIntResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  JSON: jsonScalar,

  Query: {},

  Mutation: {},
};

const resolvers = merge(setupResolvers, UserResolvers);

export default resolvers;
