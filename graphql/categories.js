import gql from 'graphql-tag';

export const CATEGORIES_QUERY = gql`
    query signUpQuery {
    allCategories {
      _id
      name
      color
    }
    }
`
