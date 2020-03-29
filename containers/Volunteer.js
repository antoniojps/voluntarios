import React, { useState, useEffect } from 'react'
import { Card } from 'components/molecules'
import { ButtonZeit } from 'components/atoms'
import { Modal, Spacer, Note } from '@zeit-ui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useLazyQuery } from '@apollo/react-hooks'
import { USER_EMAIL_QUERY } from '../graphql'

const Volunteer = ({_id, name, ...props}) => {
  const [hasVerified, setHasVerified] = useState(false)
  const [hasTappedSubmit, setHasTappedSubmit] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const handler = () => setOpen(true)
  const closeHandler = () => {
    setOpen(false)
  }
  const [loadEmail, { data, loading, error }] = useLazyQuery(USER_EMAIL_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  const showCaptchaError = !hasVerified && hasTappedSubmit
  const isomorphicWindow = typeof window !== 'undefined' ? window : {}

  const handleContact = () => {
    setHasTappedSubmit(true)
    if (hasVerified && data && data.user && data.user.email) {
      isomorphicWindow.location = `mailto:${data.user.email}`
    }
  }

  useEffect(() => {
    loadEmail({
      variables: {
        id: _id,
      },
    })
  }, [hasVerified])

  return (
    <>
      <Card name={name} {...props} onContact={handler} />
      <Modal open={isOpen} onClose={closeHandler}>
        <Modal.Title>Contactar</Modal.Title>
        <Modal.Content>
          <Card
            name={name}
            {...props}
            onContact={handler}
            hasShadow={false}
            hasContact={false}
            hasLocations={false}
            hasCategories={false}
          />
            <ButtonZeit stretch type="secondary" disabled={!hasVerified} onClick={handleContact} loading={loading}>
            Enviar e-mail
            </ButtonZeit>
            {error && (
              <>
                <Spacer y={0.5} />
                <Note label={false} type="error" style={{ height: 'fit-content' }}>
                  Lamentamos, ocorreu um erro a obter o contacto.
                </Note>
              </>
            )}
            {!hasVerified && (
              <section>
                <Spacer y={1} />
                <Note label={false} style={{ height: 'fit-content' }}>
                  Verifique que não é um robô para contactar {name}.
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
              {showCaptchaError && (
                <>
                  <Spacer y={0.5} />
                  <Note label={false} type="error" style={{ height: 'fit-content' }}>
                    Para que o
                    {' '}
                    {name}
                    {' '}
                    não receba spam é necessário verificar que não é um robô...
                  </Note>
                </>
                )
              }
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Volunteer