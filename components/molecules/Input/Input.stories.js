import { withA11y } from "@storybook/addon-a11y";
import InputText from './InputText';
import InputPassword from './InputPassword';
import InputDropdown from './InputDropdown';
import InputMultiple from './InputMultiple';
import * as yup from 'yup'

export default {
  title: "Molecules/InputText",
  decorators: [withA11y],
};

export const TextInput = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    placeholder="O seu nome..."
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    schema={yup.string()}
  />
)

export const TextInputRequired = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    placeholder="O seu nome..."
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório')}
  />
)

export const TextInputError = () => (
  <InputText
    title='Qual é o seu email?'
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    placeholder="nome@mail.com"
    schema={yup.string().email('Não é um email válido')}
    value='fagaio'
  />
)

export const TextInputValid = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    placeholder="O seu nome..."
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    value='Vasco'
    schema={yup.string()}
  />
)


export const PasswordInput = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório').min(8)}
  />
)

export const PasswordInputError = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    value='olaolaolaolaolaola'
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório').max(8)}
  />
)

export const PasswordInputValid = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    value='olaolaolaolaolaola'
    value='olaolaolaolaolaola'
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório')}
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

export const MultipleInput = () => (
  <InputMultiple
    title='Quais sao as suas competencias?'
    number={1}
    handleChange={console.log}
    value=''
    items={items}
    limit={5}
  />
)