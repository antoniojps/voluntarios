import gql from 'graphql-tag';

export const volunteerFragment = gql`
  fragment VolunteerDetail on User {
    _id
    name
    email
    job
    categories {
      name
      color
      _id
    }
    locations {
      name
      geolocation {
        lat
        long
      }
      _id
    }
  }
`

export const USERS_QUERY = gql`
  query users($input: UsersFilterInput!, $pagination: PaginationInput) {
    users(input: $input, pagination: $pagination) {
      list {
        ...VolunteerDetail
      }
      pageInfo {
        totalDocs
        pagingCounter
        limit
        hasNextPage
        hasPrevPage
      }
    }
  }
  ${volunteerFragment}
`

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      _id
      name
      admin
      moderator
    }
  }
`