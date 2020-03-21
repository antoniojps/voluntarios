import { withA11y } from "@storybook/addon-a11y";
import Filter from './Filter'

export default {
  title: "Molecules/Filters",
  decorators: [withA11y],
};

const items = [
  {
    id: 0,
    label: "inscritos recentemente",
  },
  {
    id: 1,
    label: "inscritos ha mais tempo",
  },
  {
    id: 2,
    label: "lorem",
  },
  {
    id: 3,
    label: "ipsum",
  },
  {
    id: 4,
    label: "dolor",
  },
  {
    id: 5,
    label: "sit",
  },
];

export const Order = () => <Filter items={items} handleChange={console.log} />

export const OrderWithSearch = () => <Filter items={items} searchEnabled handleChange={console.log} />


