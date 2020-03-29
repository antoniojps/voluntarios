import React, { useEffect, useState, useMemo } from 'react'
import { useSetState } from 'react-use'
import { InputText, InputMultiple, InputPassword } from 'components/molecules'
import { AnimatePresence, motion } from 'framer-motion'

const FormSteps = ({
  form = [],
  initial = 0,
  currentStep = 0,
  onStepChange = () => null,
  onSubmit = () => null,
  onChange = () => null,
  onChangeValid = () => null,
}) => {
  const [state, setState] = useSetState({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
    },
  );
  const [input, setInput] = useState(initial)
  const isLastPage = input === form.length - 1

  const isInputValid = useMemo(() => {
    const { schema, name } = form[input]
    return schema.isValidSync(state[name])
  }, [input, state])

  useEffect(() => {
    onChangeValid(isInputValid)
  }, [isInputValid])

  useEffect(() => {
    onChange(state)
  }, [state])

  useEffect(() => {
    setInput(currentStep)
  }, [currentStep])

  const goToNextInput = () => {

    const next = input + 1
    if (input >= 0 && input < form.length - 1) {
      setInput(next)
      onStepChange(next)
    }
  }

  // const goToPreviousInput = () => {
  //   if (input > 0 && input < form.length) setInput(input - 1)
  // }

  // const handleStepsChange = (step) => {
  //   if (step > input) goToNextInput()
  //   if (step < input) goToPreviousInput()
  // }

  const handleSubmit = () => {
    if (isLastPage) onSubmit(state)
    else goToNextInput()
  }

  const renderInput = () => {
    const inputProps = form[input]
    const step = input + 1

    if (inputProps.type === 'text') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={inputProps.name}
        >
          <InputText
            number={step}
            initialValue={state[inputProps.name]}
            handleChange={(value) => setState({ [inputProps.name]: value })}
            handleSubmit={handleSubmit}
            {...inputProps}
          />
        </motion.div>
      )
    }
    if (inputProps.type === 'password') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={inputProps.name}
        >
          <InputPassword
            number={step}
            initialValue={state[inputProps.name]}
            handleChange={(value) => setState({ [inputProps.name]: value })}
            handleSubmit={handleSubmit}
            {...inputProps}
          />
        </motion.div>
      )
    }
    if (inputProps.type === 'multiple') {
      return (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ ease: 'easeIn' }}
          key={inputProps.name}
        >
        <InputMultiple
          number={step}
          initialValue={state[inputProps.name]}
          handleChange={(values) => {
            let parsedValues = values
            if (typeof inputProps.handler === 'function') {
              parsedValues = inputProps.handler(values)
            }
            setState({[inputProps.name]: parsedValues})
          }}
          handleSubmit={handleSubmit}
          {...inputProps}
          />
        </motion.div>
      )
    }
    // if (inputProps.type === 'location') {
    //   return (
    //     <motion.div
    //       initial={{ y: 30, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       exit={{ y: -30, opacity: 0 }}
    //       transition={{ ease: 'easeIn' }}
    //       key={inputProps.name}
    //     >
    //       <InputPlaces
    //           initialValue={state[inputProps.name]}
    //           onChange={handleChangePlaces}
    //       />
    //     </motion.div>
    //   )
    // }

    return null;
  }

  return (
    <div>
      <AnimatePresence initial={false} exitBeforeEnter>
        {renderInput()}
      </AnimatePresence>
    </div>
  )
}

export default FormSteps