import React from 'react'
import Popover from './../components/molecules/Popover/Popover'
import { LinkActive } from 'components/atoms'

const links = [
  { label: 'Sobre', to: '/blog/sobre' },
  { label: 'Contactar', to: '/blog/contacto' },
  { label: 'Privacidade', to: '/blog/politica-de-privacidade' },
  { label: 'Projeto covindex.pt', to: 'https://www.covindex.pt/', target: '_blank' },
]

const Icon = () => (
  <svg width="13" height="3" fill="none" className="dots" viewBox="0 0 13 3">
    <rect width="3" height="3" fill="#999" rx="1.5"></rect>
    <rect width="3" height="3" x="5" fill="#999" rx="1.5"></rect>
    <rect width="3" height="3" x="10" fill="#999" rx="1.5"></rect>
  </svg>
)

const List = () => (
  <div className="list">
    {links.map(({ label, to, target }) => (
      <LinkActive key={label} target={target ? target : undefined} href={to} activeClassName='active'>
        <a>{label}</a>
      </LinkActive>
    ))}
    <style jsx>{`
      .list {
        font-size: var(--size-xs);
        padding: 8px 0px;
        display: flex;
        flex-direction: column;
        a {
          padding: 8px 20px;
          color: var(--base40);
          cursor: pointer;
        }
        a:hover {
          color: var(--base);
          background-color: var(--bgLighter);
        }
      }
      .active {
        color: var(--base60) !important;
        pointer-events: none;
        cursor: default;
      }
    `}</style>
  </div>
)

const NavMore = () => {
  return (
      <Popover
        content={<List />}
        handlerWidth={15}
        position="bottom"
        align="center"
      >
      <button className="btn--invisible">
        <Icon />
      </button>
      <style jsx>{`
        .btn--invisible {
          border: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover,&:focus{
            background-color: var(--bgLighter);
          }
        }
      `}</style>
    </Popover>
  )
}

export default NavMore