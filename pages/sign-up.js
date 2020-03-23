/* eslint-disable no-unused-vars */
import React from 'react';
import Link from 'next/link';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SignupSteps } from '../components/organisms';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';

const signUpQuery = gql`
  query signUpQuery {
    allCategories {
      _id
      name
      color
    }
  }
`;

const SignUpMutation = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      email
    }
  }
`;

function SignUp() {
  const { data } = useQuery(signUpQuery);

  const categories = data && data.allCategories && data.allCategories.map(category => ({
    id: category._id,
    label: category.name,
  }))

  return (
    <div className="container">
      <h1>Inscrição</h1>
      <SignupSteps categories={categories} />
    </div>
  );
}

export default withApollo({ ssr: true })(SignUp);
