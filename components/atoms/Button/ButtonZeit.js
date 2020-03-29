import React from 'react'
import { Button } from '@zeit-ui/react'
import './Button.module.scss'

const ButtonZeit = ({stretch = false, ...props}) => (
  <Button
    {...props}
    style={{ borderWidth: '2px', textTransform: 'uppercase', fontWeight: 600, width: stretch ? '100%' : 'auto' }}
  />
)

export default ButtonZeit