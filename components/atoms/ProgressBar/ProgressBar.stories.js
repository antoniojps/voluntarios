import { withA11y } from "@storybook/addon-a11y";
import ProgressBar from './ProgressBar'

export default {
  title: "Atoms/ProgressBar",
  decorators: [withA11y],
};

export const ProgressBarExample = () => <ProgressBar  />
