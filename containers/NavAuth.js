import React from 'react'
import Popover from './../components/molecules/Popover/Popover'
import { LinkActive, Avatar } from 'components/atoms'


const links = [
  { label: 'Perfil', to: '/profile' },
  { label: 'Avatar', to: '/avatar' },
  { label: 'Sair', to: '/sign-out' },
]

const List = () => (
  <div className="list">
    {links.map(({ label, to }) => (
      <LinkActive key={label} href={to} activeClassName='active'>
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

const NavAuth = ({ avatar = {} }) => {
  return (
      <Popover
        content={<List />}
        handlerWidth={15}
        position="bottom"
        align="end"
    >
      <div className="nav-avatar">
        <Avatar size="sm" {...avatar} hoverable />
      </div>
    </Popover>
  )
}



export default NavAuth