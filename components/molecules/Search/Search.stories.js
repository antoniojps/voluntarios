import { withA11y } from "@storybook/addon-a11y";
import Search from './Search'

export default {
  title: "Molecules/Search",
  decorators: [withA11y],
};

export const SimpleSearch = () => <Search title='procurar por' handleChange={console.log} />

export const SearchWithDesc = () => <Search title='procurar por' desc='todos os voluntários' handleChange={console.log} />