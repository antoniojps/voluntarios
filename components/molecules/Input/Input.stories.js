import { withA11y } from "@storybook/addon-a11y";
import InputText from './InputText'

export default {
  title: "Molecules/InputText",
  decorators: [withA11y],
};


export const TextInput = () => <InputText title='Qual é o seu primeiro nome?' number={1} handleChange={console.log} />


