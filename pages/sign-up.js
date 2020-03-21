import React from 'react';
import Link from 'next/link';
import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Field from '../components/field';
import { getErrorMessage } from '../utils/form';
import { useRouter } from 'next/router';

const SignUpMutation = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
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
    const { value: email} = event.currentTarget.elements.email;
    const { value: password } = event.currentTarget.elements.password;
    const { value: firstName } = event.currentTarget.elements.firstName;
    const { value: lastName } = event.currentTarget.elements.lastName;

    try {
      await signUp({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      });

      router.push('/');
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="firstName"
          type="firstName"
          autoComplete="firstName"
          required
          label="Primeiro nome"
        />
        <Field
          name="lastName"
          type="lastName"
          autoComplete="lastName"
          required
          label="Último nome"
        />
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
        <button type="submit">Inscrever</button> ou{' '}
        <Link href="sign-in">
          <a>log in</a>
        </Link>
      </form>
    </div>
  );
}

export default withApollo({ ssr: true })(SignUp);
