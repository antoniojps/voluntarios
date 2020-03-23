import { withA11y } from "@storybook/addon-a11y";
import Filter from './Filter'

export default {
  title: "Molecules/Filters",
  decorators: [withA11y],
};

const items = [
  {
    
    _id: 0,
    name: "inscritos recentemente",
  },
  {
    _id: 1,
    name: "inscritos ha mais tempo",
  },
  {
    _id: 2,
    name: "lorem",
  },
  {
    _id: 3,
    name: "ipsum",
  },
  {
    _id: 4,
    name: "dolor",
  },
  {
    _id: 5,
    name: "sit",
  },
];

export const Order = () => <Filter items={items} handleChange={console.log} />

export const OrderWithSearch = () => <Filter items={items} searchEnabled handleChange={console.log} />


