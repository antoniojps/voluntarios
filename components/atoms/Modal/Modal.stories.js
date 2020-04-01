import { withA11y } from "@storybook/addon-a11y";
import Modal from './Modal'
import Button from '../Button/ButtonZeit'

export default {
  title: "Atoms/Modal",
  decorators: [withA11y],
};

export const logo = () => {
  const [isOpen, setOpen] = React.useState(false)
  const toggle = () => setOpen(!isOpen)
  return (
    <>
      <Button onClick={toggle}>click me</Button>
      <Modal title="Title" isOpen={isOpen} toggle={toggle}>Whats up</Modal>
    </>
  )
}
