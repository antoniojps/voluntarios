import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout } from 'components/atoms'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut, { data }] = useMutation(SignOutMutation);

  useEffect(() => {
    signOut()
  }, []);

  useEffect(() => {
    async function resetAndRedirect() {
      await client.resetStore()
      router.push('/sign-in')
    }
    if (data && data.signOut) {
      resetAndRedirect()
    }
  }, [data])

  return (
    <Layout title="Até breve!" description="A sair...">
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

export default withApollo({ ssr: false })(SignOut);
