import React from 'react'
import { ButtonZeit } from 'components/atoms'
import { Card } from 'components/molecules'
import { Spinner, Spacer } from '@zeit-ui/react'
import Confetti from 'react-dom-confetti';
import { useRouter } from 'next/router'

const config = {
  angle: "90",
  spread: "91",
  startVelocity: "20",
  elementCount: "40",
  dragFriction: 0.1,
  duration: 2000,
  stagger: 0,
  width: "5px",
  height: "5px",
  colors: ["#FF7FA8", "#89C5B3", "#8E80C5", "#fdff6a"],
};

const LoaderSignUp = ({ successToggle = false, user = null }) => {
  const router = useRouter()
  return (
    <div className="loader-signup">
      <Confetti active={successToggle} config={config} />
      {successToggle ? (
        <>
          {user && (
            <>
              <Card {...user} hasContact={false} />
              <Spacer y={1} />
            </>
          )}
          <div className="actions">
            <ButtonZeit type="secondary" onClick={() => router.push('/profile')}>
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