import { withA11y } from "@storybook/addon-a11y";
import Range from './Range'

export default {
  title: "Atoms/Range",
  decorators: [withA11y],
};

export const logo = () => {
  const [value, setValue] = React.useState(0)
  return <Range min={0} max={100} value={value} onChange={setValue} />
}
