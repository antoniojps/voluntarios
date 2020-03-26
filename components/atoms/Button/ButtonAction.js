import React from 'react'
import { Icon } from 'components/atoms'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'

const ButtonAction = ({ children = 'Button', onClick = () => null }) => {
  return (
    <button className="btn--primary btn--action" onClick={onClick}>
        {children}
        <span className="btn__icon">
            <Icon icon={faChevronRight} />
      </span>
      <style jsx>{`
        .btn {
          &--action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:hover {
              .btn__icon {
                transform: translateX(2px);
              }
            }
          }
          &__icon {
            transition: all 0.2s ease;
            padding-left: var(--spacing-xs5);
          }
        }
      `}</style>
    </button>
  )
}

export default ButtonAction
