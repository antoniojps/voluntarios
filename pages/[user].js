import React from 'react';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout } from 'components/atoms'
import { Spacer } from '@zeit-ui/react'
import {USER_SLUG_QUERY } from '../graphql'
import Volunteer from '../containers/Volunteer'
import Link from 'next/link'

const Description = () => (
  <div>
    Voluntário
  </div>
)

const DescriptionNotFound = () => (
  <p>
    Não encontramos nada aqui.
    {' '}
    <Link href="/">
      <a>
        Voltar à página inicial.
      </a>
    </Link>
  </p>
)

function Profile({ user }) {
  if (user) return (
    <Layout title={user.name} description={<Description job={user.job} />}>
      <Seo title={user.name} shouldAppend={false} />
      <Volunteer {...user} hasPerson={false} />
      <Spacer y={5} />
    </Layout>
  );

  return (
    <Layout title="Mhm..." description={<DescriptionNotFound />}>
      <Seo title="404" />
      <div className="nope">
        <img src="/404.gif" alt="Man in black extends his hand as saying, where are we, reference to movie Pulp Fiction" />
      </div>
      <style jsx>{`
        .nope {
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
  )
}


Profile.getInitialProps = async (ctx) => {
  const slug = ctx.query.user
  try {
    const {data: { userBySlug }} = await ctx.apolloClient.query({
      query: USER_SLUG_QUERY,
      variables: {
        slug,
      },
    });

    // pass user to page
    return {
      user:  userBySlug,
    }
  } catch (err) {
    return {
      user: null,
    }
  }
}

export default withApollo({ ssr: true })(Profile);
