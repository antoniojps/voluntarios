import { withA11y } from "@storybook/addon-a11y";
import Avatar from './Avatar'

export default {
  title: "Atoms/Avatar",
  decorators: [withA11y],
};

const src = 'https://scontent.fbru2-1.fna.fbcdn.net/v/t1.0-9/p960x960/83684971_10219246916195136_7758163107968450560_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=dT0bqq6Uj5YAX-zE6aO&_nc_ht=scontent.fbru2-1.fna&_nc_tp=6&oh=60ae1502736c6c0dfc6f7d0cd642264d&oe=5E9C0CE9';

export const SmallAvatar = () => <Avatar src={src} size='sm' />
export const MediumAvatar = () => <Avatar src={src} size='md' />
export const LargeAvatar = () => <Avatar src={src} size='lg' />
