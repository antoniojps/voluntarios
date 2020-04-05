import { useState } from 'react'
import { Layout, ButtonZeit } from 'components/atoms'
import Seo from 'containers/Seo'
import AvatarForm from './../components/organisms/AvatarForm/AvatarForm'
import { withApollo } from '../apollo/client';
import { withAuth } from 'utils/auth';
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_USER_AVATAR_MUTATION, CURRENT_USER_QUERY } from '../graphql/user'
import { useToasts } from '@zeit-ui/react'
import { useRouter } from 'next/router'

const Avatar = ({ user }) => {
  const client = useApolloClient();
  const [, setToast] = useToasts()
  const [updateAvatar, { data, loading }] = useMutation(UPDATE_USER_AVATAR_MUTATION);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  async function handleSave(input) {
    try {
        setHasSubmitted(false)
        await client.resetStore();
        await updateAvatar({
            variables: {
                input,
                userId: user._id,
            },
            update(cache, { data: { updateAvatar } }) {
                cache.writeQuery({
                  query: CURRENT_USER_QUERY,
                  data: {currentUser: updateAvatar},
                })
              },
        });
        setToast({
            text: 'Avatar gravado.',
        })
        setHasSubmitted(true)
    } catch (error) {
        setToast({
            text: 'Não foi possível gravar o avatar.',
            type: 'error',
        })
        setHasSubmitted(false)
    }
}

  const image = (data && data.updateAvatar && data.updateAvatar.avatar && data.updateAvatar.avatar.image) || (user.avatar && user.avatar.image)
  const initialIllustration = user.avatar && user.avatar.illustration

  return (
    <Layout title="Avatar" description={<Description />}>
    <Seo title="Avatar" />
      <AvatarForm
        onSubmit={handleSave}
        loading={loading}
        initialImage={image}
        initialIllustration={initialIllustration}
        successToggle={hasSubmitted}
      />
  </Layout>
  )
}

const Description = () => {
  const router = useRouter()
  return (
    <div>
      <p>Edite o seu avatar</p>
      <ButtonZeit size="mini" onClick={() => router.push('/profile')}>
          Editar perfil
      </ButtonZeit>
    </div>
  )
}

Avatar.getInitialProps = (ctx) => withAuth(ctx, { redirectPublic: true, to: '/sign-in' })

export default withApollo({ ssr: true })(Avatar)
