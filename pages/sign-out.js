import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'

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
        router.push('/sign-in');
      });
    });
  }, [signOut, router, client]);

  return (
    <div className="container">
      <Seo title="A sair..." />
      <div className="row">
        <p>Logging out...</p>
      </div>
    </div>
  );
}

export default withApollo({ ssr: false })(SignOut);
