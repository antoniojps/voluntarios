import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../apollo/typeDefs';
import resolvers from '../../apollo/resolvers';

import { AuthDirective } from '../../apollo/directives'

import middleware from './../../utils/middlewares/middleware';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  context(ctx) {
    return ctx;
  },
});

// custom config
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloHandler = apolloServer.createHandler({
  path: process.env.GRAPHQL_ENDPOINT,
});

export default middleware(apolloHandler);
