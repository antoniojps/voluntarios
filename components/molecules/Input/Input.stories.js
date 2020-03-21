import { withA11y } from "@storybook/addon-a11y";
import InputText from './InputText'

export default {
  title: "Molecules/InputText",
  decorators: [withA11y],
};

export const TextInput = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    number={1}
    handleChange={console.log}
  />
)

export const TextInputError = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    number={1}
    handleChange={console.log}
    error
    errorMessage='O valor inserido é inválido.'
    value='fagaio'
  />
)

export const TextInputValid = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    number={1}
    handleChange={console.log}
    valid
    value='Vasco'
  />
)