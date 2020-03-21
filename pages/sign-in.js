import React from 'react';
import Link from 'next/link';
import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Field from '../components/field';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn._id) {
        await router.push('/');
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Log in</button> or{' '}
        <Link href="sign-up">
          <a>Inscrever</a>
        </Link>
      </form>
    </div>
  );
}

export default withApollo({ ssr: true })(SignIn);
