import React from 'react'
import { Button } from '@zeit-ui/react'

const ButtonZeit = (props) => {
  return (
    <Button {...props} style={{borderWidth: '2px', textTransform: 'uppercase', fontWeight: 600}}/>
  )
}

export default ButtonZeit