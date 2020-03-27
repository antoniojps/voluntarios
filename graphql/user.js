import gql from 'graphql-tag';

export const volunteerFragment = gql`
  fragment VolunteerDetail on User {
    _id
    name
    firstName
    lastName
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
  query users($input: UserInput!, $pagination: PaginationInput) {
    users(input: $input, pagination: $pagination) {
      list {
        ...VolunteerDetail
      }
      pageInfo {
        hasNextPage
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
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      _id
      name
      admin
      moderator
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`;