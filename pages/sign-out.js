import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout } from 'components/atoms'
import { destroyCookie } from 'nookies'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/sign-in');
      });
    });
  }, [signOut, router, client]);

  return (
    <Layout title="Até breve!" description="A sair..." showPublicNav>
      <Seo title="A sair..." />
      <div className="bye">
        <img src="/sign-out.gif" alt="Okay see you in a while - South Park" />
      </div>
      <style jsx>{`
        .bye {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            border-radius: 20px;
          }
        }
      `}</style>
    </Layout>
  );
}

SignOut.getInitialProps = (ctx) => {
  destroyCookie(ctx, 'token')
  return {}
}

export default withApollo({ ssr: true })(SignOut);
