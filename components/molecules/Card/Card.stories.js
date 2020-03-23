import { withA11y } from "@storybook/addon-a11y";
import Card from './Card'

export default {
  title: "Molecules/Card",
  decorators: [withA11y],
};

const props = {
  name: 'Henrique Silva',
  job: 'Enfermeiro',
  src: 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.0-9/p960x960/83684971_10219246916195136_7758163107968450560_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=dT0bqq6Uj5YAX-zE6aO&_nc_ht=scontent.fbru2-1.fna&_nc_tp=6&oh=60ae1502736c6c0dfc6f7d0cd642264d&oe=5E9C0CE9',
  locations: [
    {
      name: 'Aveiro',
    },
  ],
  categories: [
    {
      _id: 0,
      name: 'Saude',
    },
    {
      _id: 1,
      name: 'Apoio Social',
    },
  ],
}

export const CardExample = () => <Card {...props} />
