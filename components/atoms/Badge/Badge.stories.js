import { withA11y } from "@storybook/addon-a11y";
import Badge from './Badge';

export default {
  title: "Atoms",
  decorators: [withA11y],
};

export const badge = () => <Badge>hello</Badge>
