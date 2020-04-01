import React from 'react'
import { Icon } from 'components/atoms'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'
import './Button.module.scss'

const ButtonAction = ({ children = 'Button', icon = faChevronRight, onClick = () => null, className = '' }) => {
  return (
    <>
      <button className={`btn--primary btn--action ${className}`} onClick={onClick}>
          {children}
          <span className="btn__icon">
              <Icon icon={icon} />
          </span>
      </button>
    </>
  )
}

export default ButtonAction
