import { withA11y } from "@storybook/addon-a11y";
import Logo from './Logo'

export default {
  title: "Atoms",
  decorators: [withA11y],
};

export const logo = () => <Logo />
