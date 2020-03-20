import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { withApollo } from '../graphql/client';
import { Container, Row } from 'styled-bootstrap-grid';

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  React.useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin');
      });
    });
  }, [signOut, router, client]);

  return (
    <Container>
      <Row>
        <p>Signing out...</p>
      </Row>
    </Container>
  );
}

export default withApollo({ ssr: true })(SignOut);
