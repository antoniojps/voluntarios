import React from 'react';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout, ButtonAction } from 'components/atoms'
import { USER_SLUG_QUERY, CURRENT_USER_QUERY } from '../graphql'
import Volunteer from '../containers/Volunteer'
import Link from 'next/link'
import { Share } from 'components/molecules'
import { useRouter } from 'next/router'
import { useToasts } from '@zeit-ui/react'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@apollo/react-hooks'

const { DOMAIN } = process.env

const Description = ({ path, categories = [], showEdit = false }) => {
  const profileUrl = `${DOMAIN}${path}`
  const [, setToast] = useToasts()

  return (
    <div className="description-user">
      <p>
        Disponível para ajudar
        {' '}
        {categories.length > 0 ? ` na${categories.length > 1 ? 's' : ''} área${categories.length > 1 ? 's' : ''} de ${categories.map(opt => opt.name).join(', ')}` : ''}
        .
      </p>
      <div className="description-actions">
        {showEdit && (
          <>
            <Link href="/profile">
              <a>
                  <ButtonAction icon={faPen} className="btn--secondary btn--small">
                  Editar perfil
                  </ButtonAction>
              </a>
            </Link>
          </>
        )}
        <Share
          facebookUrl={profileUrl}
          twitterUrl={profileUrl}
          linkedinUrl={profileUrl}
          url={profileUrl}
          onCopy={() => setToast({
            text: 'Endereço copiado',
          })}
        />
      </div>
      <style jsx>{`
        .description-user {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .description-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

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
  const { asPath } = useRouter()
  const { data } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-only'})

  if (user) return (
    <Layout
      title={user.name}
      description={<Description path={asPath} categories={user.categories} showEdit={data && data.currentUser._id && data.currentUser._id  === user._id} />}
      showFooterCallToAction
    >
      <Seo
        title={user.name}
        description={`Disponível para ajudar${user.categories.length > 0 ? ` na${user.categories.length > 1 ? 's' : ''} área${user.categories.length > 1 ? 's' : ''} de ${user.categories.map(opt => opt.name).join(', ')}` : ''}.`}
        shouldAppend={false}
        ogImageText={`**${user.firstName}** está disponível para ajudar.`}
      />
      <Volunteer {...user} isClickable={false} hasPerson={false} />
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
      user: userBySlug,
    }
  } catch (err) {
    return {
      user: null,
    }
  }
}

export default withApollo({ ssr: true })(Profile);
