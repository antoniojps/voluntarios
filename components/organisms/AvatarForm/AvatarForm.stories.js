import { withA11y } from "@storybook/addon-a11y";
import AvatarForm from './AvatarForm'

export default {
  title: "Organisms/AvatarForm",
  decorators: [withA11y],
};

export const logo = () => <AvatarForm  />
