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
    initialValue='fagaio'
  />
)

export const TextInputValid = () => (
  <InputText
    title='Qual é o seu primeiro nome?'
    placeholder="O seu nome..."
    number={1}
    handleChange={console.log}
    handleSubmit={alert}
    initialValue='Vasco'
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
    initialValue='olaolaolaolaolaola'
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório').max(8)}
  />
)

export const PasswordInputValid = () => (
  <InputPassword
    title='Escolha uma password'
    number={1}
    handleChange={console.log}
    initialValue='olaolaolaolaolaola'
    initialValue='olaolaolaolaolaola'
    handleSubmit={alert}
    schema={yup.string().required('Este campo é obrigatório')}
  />
)


const options = [
  { value: 0, label: 'Aveiro' },
  { value: 1, label: 'Lisboa' },
  { value: 2, label: 'Porto' },
  { value: 3, label: 'Guimaraes' },
  { value: 4, label: 'Braga' },
  { value: 5, label: 'Beja' },
  { value: 6, label: 'Evora' },
  { value: 7, label: 'Faro' },
  { value: 8, label: 'Coimbra' },
  { value: 9, label: 'Guarda' },
  { value: 10, label: 'Viana do Castelo' },
  { value: 11, label: 'Alentejo' },

]
export const DropdownInput = () => (
  <InputDropdown
    title='Qual a sua localidade?'
    number={1}
    handleChange={console.log}
    initialValue=''
    options={options}
    limit={5}
  />
)

export const DropdownInputSelected = () => (
  <InputDropdown
    title='Qual a sua localidade?'
    number={1}
    handleChange={console.log}
    initialValue={options[2].label}
    items={options}
    limit={5}
  />
)

export const MultipleInput = () => (
  <InputMultiple
    title='Quais sao as suas competencias?'
    number={1}
    handleChange={console.log}
    initialValue={[]}
    options={options}
    limit={5}
  />
)