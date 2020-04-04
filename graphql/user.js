import gql from 'graphql-tag';

export const volunteerFragment = gql`
  fragment VolunteerDetail on User {
    _id
    name
    firstName
    lastName
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
    avatar {
      image {
        small
        medium
        large
      }
      illustration {
        hair
        face
        accessory
        facialHair
      }
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
        hasNextPage
      }
    }
  }
  ${volunteerFragment}
`

export const USER_EMAIL_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      email
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      admin
      moderator
      email
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: ID!, $input: UserUpdateInput!) {
    updateUser(userId: $userId, input: $input) {
      admin
      moderator
      email
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`;

export const UPDATE_USER_AVATAR_MUTATION= gql`
  mutation updateAvatar($userId: ID!, $input: AvatarInput!) {
    updateAvatar(userId: $userId, input: $input) {
      admin
      moderator
      email
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`;

export const SIGNUP_USER_MUTATION = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      admin
      moderator
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      email
      verified
    }
  }
`

export const USER_SLUG_QUERY = gql`
query userBySlug($slug: String!) {
  userBySlug(slug: $slug) {
      ...VolunteerDetail
    }
  }
  ${volunteerFragment}
`