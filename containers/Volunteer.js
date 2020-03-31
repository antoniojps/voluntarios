import React, { useState, useEffect } from 'react'
import { Card } from 'components/molecules'
import { ContactForm } from 'components/organisms'
import { Modal, Spacer, Note, useToasts } from '@zeit-ui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@apollo/react-hooks'
import { SEND_MESSAGE_MUTATION } from '../graphql'
import Confetti from 'react-dom-confetti';
import { confettiConfig } from '../services/contants'
import { Icon } from 'components/atoms'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Volunteer = ({ name, _id, ...props }) => {
  const [hasVerified, setHasVerified] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [, setToast] = useToasts()

  const handler = () => setOpen(true)
  const closeHandler = () => setOpen(false)

  const [sendMessageToUser, { data, loading, error }] = useMutation(SEND_MESSAGE_MUTATION);

  const handleContact = async input => {
    if (input) {
      await sendMessageToUser({
        variables: {
          userId: _id,
          input,
        },
      })
    }
  }

  useEffect(() => {
    if (data && data.sendMessageToUser) {
      setOpen(false)
      setToast({
        text: `Contacto efetuado com sucesso! ${name} receberá um e-mail com a sua mensagem.`,
        delay: 5000,
      })
    }
  }, [data])

  return (
    <div>
      <Card name={name} {...props} onContact={handler} heightStretch />
      <div className="confetti-wrapper">
        <Confetti active={!loading && data} config={confettiConfig} />
      </div>
      {isOpen && (
        <button className='close-modal-btn' onClick={closeHandler}>
          <Icon icon={faTimes} />
        </button>
      )}
      <Modal open={isOpen} onClose={closeHandler}>
        <Modal.Title>
          Contactar
        </Modal.Title>
        <Modal.Content>
          <Card
            name={name}
            {...props}
            hasShadow={false}
            hasContact={false}
            hasLocations={false}
            hasCategories={false}
          />
          {hasVerified && <ContactForm volunteer={name} onSubmit={handleContact} loading={loading} />}
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
        </Modal.Content>
      </Modal>
      <style jsx>{`
          .confetti-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: var(--spacing-lg);
          }
      `}</style>
    </div>
  )
}

export default Volunteer