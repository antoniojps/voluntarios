import merge from 'lodash.merge';
import { resolvers as CategoryResolvers } from './schemas/category';
import { resolvers as UserResolvers } from './schemas/user';
import { resolvers as MessageResolvers } from './schemas/message';

import {
  DateTimeResolver,
  PositiveIntResolver,
  EmailAddressResolver,
  URLResolver,
  HexColorCodeResolver,
} from 'graphql-scalars';
import jsonScalar from 'graphql-type-json';

const setupResolvers = {
  // scalars
  DateTime: DateTimeResolver,
  PositiveInt: PositiveIntResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  JSON: jsonScalar,
  HexColorCode: HexColorCodeResolver,

  Query: {},

  Mutation: {},
};

const resolvers = merge(setupResolvers, CategoryResolvers, UserResolvers, MessageResolvers);

export default resolvers;
