import { withA11y } from "@storybook/addon-a11y";
import Icon from './Icon';

export default {
  title: "Atoms/Icons",
  decorators: [withA11y],
};

export const icon = () => <Icon />
