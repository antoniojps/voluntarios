import React from 'react'
import Nav from '../../organisms/Nav/Nav'

const DescriptionDefault = () => (<p>Descrição</p>)

const Layout = ({
  children,
  title = 'Title',
  description = <DescriptionDefault />,
  showPublicNav = false,
}) => {
  return (
    <div className="container">
      <Nav skipAuth={showPublicNav} />
      <div className={'hero'}>
        <h1>{title}</h1>
        <div className="hero__description">
          {description}
        </div>
      </div>

      <main>
        {children}
      </main>

      <style jsx>{`
      @import "assets/styles/mixins.scss";
      .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 75px;
        margin-bottom: 70px;
        @include screen(md) {
          margin-top: var(--spacing-xl);
          margin-bottom: var(--spacing-xs);
        }
        h1 {
          margin: 0;
        }
        &__description {
          margin-top: var(--spacing-xs);
          display: flex;
          @include screen(md) {
            margin-bottom: var(--spacing-xs2);
          }
        }
      }

      main {
        .form-fullscreen {
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
      }
      `}</style>
    </div>
  )
}

export default Layout
