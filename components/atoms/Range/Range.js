import React from 'react'
import Slider from 'react-rangeslider'
import './Range.module.scss'

const Range = (props) => {
  return (
    <Slider
      tooltip={false}
      {...props}
    />
  )
}

export default Range