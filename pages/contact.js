import React, { useState, useEffect } from 'react';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout } from 'components/atoms'
import { ContactForm } from 'components/organisms'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/react-hooks'
import { SEND_MESSAGE_SUPPORT_MUTATION } from '../graphql'
import { Spacer, Note, useToasts } from '@zeit-ui/react'

const Description = () => (
  <a href="mailto:voluntarios.app@gmail.com">
    voluntarios.app@gmail.com
  </a>
)

function Contact() {
  const [hasVerified, setHasVerified] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [, setToast] = useToasts()

  const [sendMessageToSupport, { data, loading, error }] = useMutation(SEND_MESSAGE_SUPPORT_MUTATION);

  const handleContact = async input => {
    if (input) {
      await sendMessageToSupport({
        variables: {
          input,
        },
      })
    }
  }

  useEffect(() => {
    if (data && data.sendMessageToSupport) {
      setHasSent(true)
      setToast({
        text: `Contacto efetuado com sucesso! Responderemos em breve.`,
        delay: 5000,
      })
    }
  }, [data])


  return (
    <Layout title="Contactar" description={<Description />} showFooterCallToAction classNameMain="mini">
      <Seo title="Contactar" />
      {hasSent && (
        <>
          <h2>Obrigado pelo contacto.</h2>
          <Note label={false} style={{ height: 'fit-content' }}>
              Responderemos num prazo de 24 horas.
          </Note>
        </>
      )}
      {hasVerified && !hasSent && <ContactForm volunteer="" onSubmit={handleContact} loading={loading} />}
        {error && (
          <>
            <Note label={false} type="error" style={{ height: 'fit-content' }}>
              Lamentamos, ocorreu um erro a obter o contacto.
                </Note>
          </>
        )}
        {!hasVerified && (
          <section>
            <Note label={false} style={{ height: 'fit-content' }}>
              Verifique que não é um robô para contactar.
                </Note>
            <Spacer y={0.5} />
            <ReCAPTCHA
              sitekey="6LdcC-UUAAAAAM7qJxeyLarefJOmD_rcN66sNOB2"
              onChange={() => setHasVerified(true)}
              onExpired={() => setHasVerified(false)}
              onErrored={() => setHasVerified(false)}
              style={{ display: "flex", justifyContent: 'center' }}
            />
          </section>
        )}
      <style jsx>{`

      `}</style>
    </Layout>
  );
}

export default withApollo({ ssr: false })(Contact);
