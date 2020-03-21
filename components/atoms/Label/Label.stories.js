import { withA11y } from "@storybook/addon-a11y";
import Label from './Label'

export default {
  title: "Atoms",
  decorators: [withA11y],
};

export const SimpleLabel = () => <Label text='example' />

export const LabelWithActions = () => <Label text='example' actionEnabled handleClick={() => alert('hey')} />
