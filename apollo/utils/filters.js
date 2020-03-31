import {
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server-micro';
import status from 'http-status'

/**
 * Secures a resolver for authenticated users only
 * @param {Function} func Resolver
 * @param {Boolean} admin Must be admin to call this resolver?
 * @param {Boolean} moderator Must be moderator to call this resolver?
 * @returns {Function} Resolver secured
 */
export function secure(func, admin = false, moderator = false) {
  return async (root, args, context) => {
    const { user } = context.req;
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

/**
 * Secures a resolver for a specific user (unless admin or moderator)
 * @param {Function} func Resolver
 * @param {Boolean} userIdParam userId input parameter key "id","userId"
 * @returns {Function} Resolver secured
 */
export function secureUserOnly (func, userIdParam = 'userId') {
  return (root, args, context) => {
    const { user } = context.req;
    if (!user) throw new AuthenticationError('Unauthenticated')
    else if (
      !user.admin &&
      !user.moderator &&
      args[userIdParam] !== user.id
    ) {
      throw new ForbiddenError('Unauthorized')
    }
    return func(root, args, context)
  }
}

export async function paginate (Model, query, pagination) {
  const { limit = 10, page = 1 } = pagination

  const documents = await Model.pagination(query, { page, limit })
  const {
    docs: list,
    ...pageInfo
  } = documents

  const computedPageInfo = {
    totalDocs: pageInfo.total,
    limit: pageInfo.limit,
    totalPages: pageInfo.pages,
    hasPrevPage: pageInfo.page > 1,
    hasNextPage: pageInfo.page < pageInfo.pages,
    pagingCounter: ((pageInfo.page - 1) * pageInfo.limit) + 1,
  }

  return {
    list,
    pageInfo: computedPageInfo,
  }
}

export function StatusError (code, message) {
  if (process.env.NODE_ENV === 'production') {
    return new ApolloError(status[code], code)
  }
  if (message) return new ApolloError(message, code)
  return new ApolloError(status[code], code)
}
