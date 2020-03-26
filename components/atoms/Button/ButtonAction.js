import React from 'react'
import { Icon } from 'components/atoms'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'
import './Button.module.scss'

const ButtonAction = ({ children = 'Button', onClick = () => null }) => {
  return (
    <>
      <button className="btn--primary btn--action" onClick={onClick}>
          {children}
          <span className="btn__icon">
              <Icon icon={faChevronRight} />
          </span>
      </button>
    </>
  )
}

export default ButtonAction
