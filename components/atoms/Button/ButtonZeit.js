import React from 'react'
import { Button } from '@zeit-ui/react'
import './Button.module.scss'

const ButtonZeit = props => (
  <Button
    {...props}
    style={{ borderWidth: '2px', textTransform: 'uppercase', fontWeight: 600 }}
  />
)

export default ButtonZeit