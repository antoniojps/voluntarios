import { withA11y } from "@storybook/addon-a11y";
import Modal from './Modal'

export default {
  title: "Atoms/Modal",
  decorators: [withA11y],
};

export const logo = () => {
  const [isOpen, setOpen] = React.useState(false)
  const toggle = () => setOpen(!isOpen)
  return <Modal title="Title" isOpen={isOpen} toggle={toggle}>Whats up</Modal>
}
