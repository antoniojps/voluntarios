import { withA11y } from "@storybook/addon-a11y";
import Avatar from './Avatar';

export default {
  title: "Atoms",
  decorators: [withA11y],
};

export const avatar = () => <Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Jonh Doe" />
