import {
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server-micro';
import status from 'http-status'

export function secure(func, admin = false, moderator = false) {
  return async (root, args, context) => {
    let { user } = context.req;
    if (!user) throw new AuthenticationError('Unauthenticated');
    // admin only
    if (admin && !moderator && !user.admin) {
      throw new ForbiddenError('Unauthorized');
      // admin or moderator only
    } else if (admin && moderator && !user.admin && !user.moderator) {
      throw new ForbiddenError('Unauthorized');
    }
    return func(root, args, { ...context, user });
  };
}


// With Connection, Edges, PageInfo and Count
// https://graphql.org/learn/pagination/
export async function paginate (Model, query, pagination) {
  const { limit } = pagination
  const totalCount = await Model.find(query).countDocuments()

  if (totalCount === 0) {
    return {
      totalCount,
      pageInfo: {
        hasNextPage: false,
      },
    }
  }

  const documents = await Model.find(query)
    .sort({ createdAt: 1 })
    .limit(limit)

  const edges = documents.map(user => ({
    node: user,
    cursor: user.createdAt,
  }))

  const lastNode = edges[edges.length - 1].node
  const endCursor = lastNode.createdAt

  const hasNextPage = edges.length === limit

  const pageInfo = {
    hasNextPage,
    endCursor,
  }

  return {
    totalCount,
    edges,
    pageInfo,
  }
}

export function StatusError (code, message) {
  if (process.env.NODE_ENV === 'production') {
    return new ApolloError(status[code], code)
  }
  if (message) return new ApolloError(message, code)
  return new ApolloError(status[code], code)
}
