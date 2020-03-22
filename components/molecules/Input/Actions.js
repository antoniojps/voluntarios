import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from "components/atoms";
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Actions = ({
  showError = false,
  showSkip = false,
  showSubmit = false,
  errorMessage = 'Campo inválido',
  onSubmit = () => null,
}) => {
  return (
<AnimatePresence initial={false} exitBeforeEnter>
    {showError && (
        <motion.p
            className='input__input-text__error-message'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="error"
        >
            {errorMessage}
        </motion.p>
    )}

    {showSkip && (
        <motion.button
            className='btn--primary'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            key="skip"
            onClick={onSubmit}
        >
            Passar
        </motion.button>
    )}

      {showSubmit && (
          <motion.div className="input__submit">
              <motion.button
                  className='btn--primary'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="ok"
                  onClick={onSubmit}
              >
                  Ok
                  <span className="btn__icon">
                      <Icon icon={faCheck} />
                  </span>
              </motion.button>
              <motion.div className="input__submit-description">
                  pressione Enter ↵
              </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Actions