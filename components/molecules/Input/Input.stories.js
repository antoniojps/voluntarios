import { withA11y } from "@storybook/addon-a11y";
import InputText from './InputText';
import InputPassword from './InputPassword';
import InputDropdown from './InputDropdown';

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

export const TextInputRequired = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    number={1}
    handleChange={console.log}
    required
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


export const PasswordInput = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
  />
)

export const PasswordInputError = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    value='olaolaolaolaolaola'
    error
  />
)

export const PasswordInputValid = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    value='olaolaolaolaolaola'
    valid
  />
)


const items = [
  { id: 0, label: 'Aveiro' },
  { id: 1, label: 'Lisboa' },
  { id: 2, label: 'Porto' },
  { id: 3, label: 'Guimaraes' },
  { id: 4, label: 'Braga' },
  { id: 5, label: 'Beja' },
  { id: 6, label: 'Evora' },
  { id: 7, label: 'Faro' },
  { id: 8, label: 'Coimbra' },
  { id: 9, label: 'Guarda' },
  { id: 10, label: 'Viana do Castelo' },
  { id: 11, label: 'Alentejo' },

]
export const DropdownInput = () => (
  <InputDropdown
    title='Qual a sua localidade?'
    number={1}
    handleChange={console.log}
    value=''
    items={items}
    limit={5}
  />
)

export const DropdownInputSelected = () => (
  <InputDropdown
    title='Qual a sua localidade?'
    number={1}
    handleChange={console.log}
    value={items[2].label}
    items={items}
    limit={5}
  />
)