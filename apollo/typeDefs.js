import gql from 'graphql-tag';
import { typeDef as Category } from './schemas/category';
import { typeDef as Pagination } from './schemas/pagination';
import { typeDef as User } from './schemas/user';
import { typeDef as Message } from './schemas/message';

const setup = gql`
  # Directives
  directive @auth(requires: Role = user) on FIELD_DEFINITION
  enum Role {
    admin
    moderator
    owner
    user
  }

  scalar DateTime
  scalar EmailAddress
  scalar PositiveInt
  scalar URL
  scalar JSON
  scalar HexColorCode

  # In the current version of GraphQL, you can’t have an empty type
  # even if you intend to extend it later. So we need to make sure the
  # Query type has at least one field in this case we add a fake _empty field
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [setup, Pagination, Category, User, Message];

export default typeDefs;
