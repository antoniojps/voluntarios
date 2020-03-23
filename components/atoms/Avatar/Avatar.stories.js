import { withA11y } from "@storybook/addon-a11y";
import Avatar from './Avatar'

export default {
  title: "Atoms/Avatar",
  decorators: [withA11y],
};

const src = null;

export const SmallAvatar = () => <Avatar src={src} size='sm' />
export const MediumAvatar = () => <Avatar src={src} size='md' />
export const LargeAvatar = () => <Avatar src={src} size='lg' />
