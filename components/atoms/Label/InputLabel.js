import React from 'react'

const Label = ({children}) => {
  return (
      <label>
        {children}
      <style jsx>{`
        label {
          font-size: var(--size-xs2);
          text-transform: uppercase;
          color: var(--base40);
          font-weight: 500;
        }
    `}</style>
      </label>
  )
}

export default Label
