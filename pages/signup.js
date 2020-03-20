import React from 'react';
import Link from 'next/link';
import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Field from '../components/field';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';
import { Container, Row } from 'styled-bootstrap-grid';

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

function SignUp() {
  const [signUp] = useMutation(SignUpMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });

      router.push('/');
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <Container>
      <Row>
        <h1>Sign Up</h1>
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
          <button type="submit">Sign up</button> or{' '}
          <Link href="signin">
            <a>Sign in</a>
          </Link>
        </form>
      </Row>
    </Container>
  );
}

export default withApollo({ ssr: true })(SignUp);
