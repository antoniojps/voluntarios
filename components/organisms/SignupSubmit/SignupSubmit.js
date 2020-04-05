import React from 'react'
import { ButtonZeit } from 'components/atoms'
import { Card, Share } from 'components/molecules'
import { Spinner, Spacer, useToasts } from '@zeit-ui/react'
import Confetti from 'react-dom-confetti';
import { useRouter } from 'next/router'
import { confettiConfig } from '../../../services/contants'

const { DOMAIN } = process.env


const LoaderSignUp = ({ successToggle = false, user = null }) => {
  const router = useRouter()
  const [, setToast] = useToasts()
  const profileUrl = user && user._id ? `${DOMAIN}/${user._id}` : DOMAIN

  return (
    <div className="loader-signup">
      <Confetti active={successToggle} config={confettiConfig} />
      {successToggle ? (
        <>
          {user && (
            <>
              <p>
                Partilha o teu perfil e divulga este movimento
                {" "}
                <span role="img" aria-label="strong">💪</span>
                .
              </p>
              <Share
                facebookUrl={profileUrl}
                twitterUrl={profileUrl}
                linkedinUrl={profileUrl}
                url={profileUrl}
                onCopy={() => setToast({
                  text: 'Endereço copiado',
                })}
              />
              <Spacer y={0.5} />
              <Card {...user} hasContact={false} />
              <Spacer y={1} />
            </>
          )}
          <div className="actions">
            <ButtonZeit type="secondary" onClick={() => router.push('/avatar')}>
              Editar avatar
            </ButtonZeit>
            <Spacer y={1} />
            <ButtonZeit onClick={() => router.push('/profile')}>
              Editar perfil
            </ButtonZeit>
            <Spacer y={1} />
            <ButtonZeit onClick={() => router.push('/')}>
                Ver voluntários
            </ButtonZeit>
          </div>
        </>
          ): (
            <h3>
              <Spinner size="small" />
              <Spacer x={1} />
              A inscrever novo voluntário
            </h3>
            )}
      <style jsx>{`
          .loader-signup {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: var(--spacing-lg);
          }
          h3 {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;
          }
      `}</style>
      </div>
  )
}

export default LoaderSignUp