import { withA11y } from "@storybook/addon-a11y";
import PersonHeader from './PersonHeader'

export default {
  title: "Atoms/PersonHeader",
  decorators: [withA11y],
};

const img = null;

export const PersonHeaderExmaple = () => <PersonHeader name='Henrique Silva' src={img} desc='Enfermeiro' />
