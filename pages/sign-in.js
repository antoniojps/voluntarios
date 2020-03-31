import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Layout, ButtonZeit } from '../components/atoms';
import { Icon } from "components/atoms";
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { Input, Spacer, Note } from '@zeit-ui/react'
import { withApollo } from '../apollo/client';
import { withAuth } from 'utils/auth'


const SignInMutation = gql`
  mutation SignInMutation($email: EmailAddress!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

export function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 404
      ) {
        return 'Não foi possível encontrar esta conta.'
      }
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 401
      ) {
        return 'Palavra-passe errada.'
      }
    }
  }
  return error.message
}

function SignIn() {
  const client = useApolloClient();
  const [signIn, { loading }] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const [formState, setFormState] = useState({ email: '', password: ''})

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: formState,
      });
      if (data.signIn._id) {
        await router.push('/profile');
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
      <Layout
        title="Entrar no Voluntarios"
        description="Insira o seu email e palavra-chave"
        showPublicNav={true}
      >
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit}>
            <Input
              onChange={(event) => setFormState({ ...formState, email: event.target.value })}
              value={formState.email}
              icon={<Icon icon={faEnvelope} />}
              type="email"
              placeholder="nome@dominio.com"
              size="large"
              name="email"
              autoComplete="on"
              required
            />
            <Spacer y={0.5}/>
            <Input
              onChange={(event) => setFormState({ ...formState, password: event.target.value })}
              value={formState.password}
              icon={<Icon icon={faKey} />}
              placeholder="palavra-chave"
              type="password"
              size="large"
              name="password"
              autoComplete="on"
              required
            />
            <Spacer y={0.5} />
            <Spacer y={0.5} />
            <ButtonZeit type="secondary" loading={loading}>
              Continuar
            </ButtonZeit>
          </form>
      </div>
      <Spacer y={1} />
      <div className="row justify-content-center">
        {errorMsg && (
            <Note label={false} type="error">{errorMsg}</Note>
          )}
      </div>
      <style jsx>{`
          form {
            display: inline-flex;
            flex-direction: column;
            width: auto;
          }
      `}</style>
      </Layout>
  );
}

SignIn.getInitialProps = (ctx) => withAuth(ctx, {redirectAuthenticated: true})

export default withApollo({ ssr: true })(SignIn);
