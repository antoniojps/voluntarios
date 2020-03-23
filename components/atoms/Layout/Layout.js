import React from 'react'
import './Layout.module.scss'

const DescriptionDefault = () => (<p>Descrição</p>)

const Layout = ({
  children,
  title = 'Title',
  description = <DescriptionDefault />,
  className = '',
}) => {
  return (
    <div className="container">
      <div className={`hero ${className}`}>
        <h1>{title}</h1>
        <div className="hero__description">
          {description}
        </div>
      </div>

      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
