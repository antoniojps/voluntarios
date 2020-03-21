import { withA11y } from "@storybook/addon-a11y";
import Card from './Card';

export default {
  title: "Atoms",
  decorators: [withA11y],
};

export const card = () => <Card>hello</Card>
