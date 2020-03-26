import { withA11y } from "@storybook/addon-a11y";
import Button from './Button'
import ButtonAction from './ButtonAction'

export default {
  title: "Atoms/Button",
  decorators: [withA11y],
};

export const ButtonPrimary = () => <Button type='primary' onClick={() => alert('hey')}>primary</Button>
export const ButtonSecondary = () => <Button type='secondary' onClick={() => alert('hey')}>secondary</Button>
export const ButtonRegular = () => <Button type='' onClick={() => alert('hey')}>regular</Button>
export const ButtonIconAction = () => <ButtonAction>Sou um voluntário</ButtonAction>
