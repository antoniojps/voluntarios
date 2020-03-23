import { withA11y } from "@storybook/addon-a11y";
import Card from './Card'

export default {
  title: "Molecules/Card",
  decorators: [withA11y],
};

const props = {
  name: 'Henrique Silva',
  job: 'Enfermeiro',
  src: null,
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
