import { withA11y } from "@storybook/addon-a11y";
import ArrowSvg from './ArrowSvg';
import Icon from './Icon';

export default {
  title: "Atoms/Icons",
  decorators: [withA11y],
};

export const arrowSvg = () => <ArrowSvg />
export const icon = () => <Icon />
