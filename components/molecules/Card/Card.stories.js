import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import Card from './Card'
import { boolean } from '@storybook/addon-knobs';

export default {
  title: "Molecules/Card",
  decorators: [withA11y, withKnobs],
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
export const CardLoading = () => <Card loading={boolean('loading', true)} {...props} />
