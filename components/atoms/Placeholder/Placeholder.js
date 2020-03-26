import React, { useMemo } from 'react'

const Placeholder = ({ x = 1, y = 1 }) => {
  const {height, width} = useMemo(() => {
    if (x < 0 || y < 0) {
      console.warning('Props "x","y" must be greater than or equal to 0', 'Spacer')
      return '0'
    }
    return {
      height: `calc(${y * 15.25}pt + 1px * ${y - 1})`,
      width:  `calc(${x * 150}pt + 1px * ${x - 1})`,
    }
  }, [x, y])

  return (
    <div className="placeholder" style={{ height, width }}>
      <style jsx>{`
      .placeholder {
        background-color: var(--bgLoading);
        max-width: 100%;
        border-radius: var(--borderRadius);
      }
      `}</style>
    </div>
  )
}

export default Placeholder