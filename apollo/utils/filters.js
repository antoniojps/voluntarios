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

export async function paginate (Model, query, pagination, sort) {
  const { limit = 10, page = 1 } = pagination

  const documents = await Model.pagination(query, { page, limit, sort })
  const {
    docs: list,
    ...pageInfo
  } = documents

  return {
    list,
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
