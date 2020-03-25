import { withA11y } from "@storybook/addon-a11y";
import Avatar from './Avatar'

export default {
  title: "Atoms/Avatar",
  decorators: [withA11y],
};

const src = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg';

export const SmallAvatarSrc = () => <Avatar src={src} size='sm' />
export const MediumAvatarSrc = () => <Avatar src={src} size='md' />
export const LargeAvatarSrc = () => <Avatar src={src} size='lg' />
export const SmallAvatar = () => <Avatar size='sm' />
export const MediumAvatar = () => <Avatar size='md' />
export const LargeAvatar = () => <Avatar size='lg' />
