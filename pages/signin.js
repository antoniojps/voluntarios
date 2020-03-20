import React from 'react';
import Link from 'next/link';
import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import Field from '../components/field';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'styled-bootstrap-grid';

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
    <Container>
      <Row>
        <h1>Sign In</h1>
      </Row>
      <Row>
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
          <button type="submit">Sign in</button> or{' '}
          <Link href="signup">
            <a>Sign up</a>
          </Link>
        </form>
      </Row>
    </Container>
  );
}

export default withApollo({ ssr: true })(SignIn);
