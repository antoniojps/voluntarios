import { withA11y } from "@storybook/addon-a11y";
import PersonHeader from './PersonHeader'

export default {
  title: "Atoms/PersonHeader",
  decorators: [withA11y],
};

const img = 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.0-9/p960x960/83684971_10219246916195136_7758163107968450560_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=dT0bqq6Uj5YAX-zE6aO&_nc_ht=scontent.fbru2-1.fna&_nc_tp=6&oh=60ae1502736c6c0dfc6f7d0cd642264d&oe=5E9C0CE9';

export const PersonHeaderExmaple = () => <PersonHeader name='Henrique Silva' src={img} desc='Enfermeiro' />
