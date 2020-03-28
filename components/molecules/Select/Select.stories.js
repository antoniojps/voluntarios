import { withA11y } from "@storybook/addon-a11y";
import Select from './Select'
import React from 'react'

export default {
  title: "Molecules/Select",
  decorators: [withA11y],
};

const options = [
  { value: 'chocolate', label: 'Chocolate', color: 'brown' },
  { value: 'strawberry', label: 'Strawberry', color: 'red' },
  { value: 'vanilla', label: 'Vanilla', color: 'grey' },
]

export const Simple = () => {
  const [value, setValue] = React.useState({ value: null })
  React.useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div style={{ width: '200px' }}>
       <Select options={options} onChange={setValue} value={value} isClearable />
    </div>
  )
}

export const Multiple = () => {
  const [value, setValue] = React.useState('')
  React.useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div style={{ width: '200px' }}>
      <Select
        options={options}
        onChange={setValue}
        value={value}
        defaultValue={[{ value: 'chocolate', label: 'Chocolate', color: 'brown' }]}
        isMulti
        isClearable={false}
        closeMenuOnSelect={false}
      />
    </div>
  )
}

export const Loading = () => {
  const [value, setValue] = React.useState('')
  React.useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div style={{ width: '200px' }}>
      <Select
        options={options}
        onChange={setValue}
        value={value}
        isMulti
        isClearable
        closeMenuOnSelect={false}
        isLoading
        isDisabled
      />
    </div>
  )
}