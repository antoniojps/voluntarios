import { withA11y } from "@storybook/addon-a11y";
import Popover from './Popover';
import Avatar from './../../atoms/Avatar/Avatar';

export default {
  title: "Molecules/Popover",
  decorators: [withA11y],
};

const Content = () => (
  <div className="content">
    Hello how are you?
    <style jsx>{`
      .content {
        padding: 1rem;
        font-family: var(--font);
      }
    `}</style>
  </div>
)

export const card = () => {
  return (
    <>
      <h1>Click below</h1>
      <Popover
        content={<Content />}
        position="bottom"
      >
      <Avatar />
      </Popover>
      </>
  )
}
