import { withA11y } from "@storybook/addon-a11y";
import Filter from './Filter'

export default {
  title: "Filters",
  decorators: [withA11y],
};

export const OrderBy = () => <Filter />
