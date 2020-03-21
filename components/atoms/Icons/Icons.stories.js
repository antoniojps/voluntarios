import { withA11y } from "@storybook/addon-a11y";
import ArrowSvg from './ArrowSvg'

export default {
  title: "Atoms/Icons",
  decorators: [withA11y],
};

export const arrowSvg = () => <ArrowSvg />
