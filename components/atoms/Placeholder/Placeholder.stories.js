import { withA11y } from "@storybook/addon-a11y";
import { Spacer } from '@zeit-ui/react'
import Placeholder from './Placeholder'

export default {
  title: "Atoms/Placeholder",
  decorators: [withA11y],
};

export const CardPlaceholder = () => (
  <>
    <Placeholder x={0.5} y={2} />
    <Spacer y={1} />
    <Placeholder x={3} />
    <Spacer y={1} />
    <Placeholder x={2} />
    <Spacer y={1} />
    <Placeholder x={1.5} y={1} />
    <Spacer y={1} />
    <Placeholder x={1} />
  </>
)