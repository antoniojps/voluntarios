import React, { useState } from 'react'
import { withA11y } from "@storybook/addon-a11y";
import Steps from './Steps'

export default {
  title: "Molecules/Steps",
  decorators: [withA11y],
};

export const SimpleSteps = () => {
  const [step, setStep] = useState(4);
  const steps = 10;

  return (
    <Steps
      steps={steps}
      currentStep={step}
      handleChange={setStep}
      title={`${step} de ${steps} até estar inscrito`}
    />
  )
}

export const LotSteps = () => {
  const [step, setStep] = useState(33);
  const steps = 100;

  return (
    <Steps
      steps={steps}
      currentStep={step}
      handleChange={setStep}
      title={`${step} de ${steps} até estar inscrito`}
    />
  )
}

export const StepsStart0 = () => {
  const [step, setStep] = useState(0);
  const steps = 5;

  return (
    <Steps
      steps={steps}
      currentStep={step}
      handleChange={setStep}
      title={`${step} de ${steps} até estar inscrito`}
    />
  )
}
