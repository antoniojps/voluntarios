import { useEffect } from 'react'
import { Layout } from 'components/atoms'
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from 'apollo/client'
import React from 'react'
import { Spacer, Tag, Note } from '@zeit-ui/react'
import Confetti from 'react-dom-confetti';
import { useRouter } from 'next/router'
import { VERIFY_EMAIL_MUTATION } from '../graphql'

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

const Verify = ({ token }) => {
  const router = useRouter()
  const [verify, { data, loading, error }] = useMutation(VERIFY_EMAIL_MUTATION)

  useEffect(() => {
    if (token === undefined) router.push('/')
    else {
      verify({
        variables: {
          input: {
            verificationToken: token,
          },
        },
      })
    }
  }, [token])

  const hasVerified = data && data.verifyEmail && data.verifyEmail.verified

  useEffect(() => {
    if (hasVerified) setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [hasVerified])

  return (
  <Layout title="👋" description="Sabia que 5 de dezembro é o dia internacional do Voluntariado?">
    <div className="loader-signup">
        <Confetti active={hasVerified} config={config} />
        {loading && (
          <Tag>
            Estado:
            {' '}
            A verificar
          </Tag>
        )}
        {
          error && (
            <Tag type="error">Estado: {error.message}</Tag>
          )
        }
        {hasVerified && (
          <>
          <h3>
              Email verificado!
          </h3>
            <Spacer y={1} />
            <Note label={false}>A redireccionar...</Note>
          </>
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
  </Layout>
  )
}

Verify.getInitialProps = (ctx) => {
  if (ctx.query && ctx.query.token) {
    return {
      token: ctx.query.token,
    }
  }
  return {}
}

export default withApollo({ ssr: false })(Verify)

