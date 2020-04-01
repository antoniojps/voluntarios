import React from 'react'
import Slider from 'react-rangeslider'

const Range = (props) => {
  return (
    <Slider
      tooltip={false}
      {...props}
    />
  )
}

export default Range