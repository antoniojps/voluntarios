import gql from 'graphql-tag'

export const typeDef = gql`
  # Pagination
  type PaginationInfo {
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    pagingCounter: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
  }

  input PaginationInput {
    limit: Int = 10
    page: Int = 1
  }
`
