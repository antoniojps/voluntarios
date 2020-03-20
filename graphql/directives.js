import { defaultFieldResolver } from 'graphql'
import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolver = defaultFieldResolver, name } = field
    const { requires } = this.args
    const whitelistOperations = [
      'currentUser', 'signIn', 'signUp'
    ]

    field.resolve = async function (source, args, context, info) {
      const {
        variableValues: { id },
      } = info
      const operation = info.operation.selectionSet.selections[0].name.value
      if (!whitelistOperations.includes(operation)) {
        if (!context.req.user) {
          throw new AuthenticationError(`Unauthenticated field ${name}`)
        }
        if (requires === 'admin' && !context.req.user.admin) {
          throw new ForbiddenError(`Unauthorized field ${name}`)
        }
        if (
          requires === 'moderator' &&
          !context.req.user.admin &&
          !context.req.user.moderator
        ) {
          throw new ForbiddenError(`Unauthorized field ${name}`)
        }
        if (
          requires === 'owner' &&
          !context.req.user.admin &&
          !context.req.user.moderator &&
          id !== context.req.user.id
        ) {
          throw new ForbiddenError(`Unauthorized field ${name}`)
        }
      }

      const result = await resolver.call(this, source, args, context, info)
      return result
    }
  }
}

export { AuthDirective }
