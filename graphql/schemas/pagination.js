import gql from 'graphql-tag'

export const typeDef = gql`
  # Pagination
  type PaginationInfo {
    hasNextPage: Boolean!
    endCursor: DateTime
  }

  input PaginationInput {
    limit: Int = 10
    after: DateTime
  }
`
