import React from 'react'
import Link from 'next/link'
import { Logo, LinkActive } from 'components/atoms'
import './Nav.module.scss'

const Nav = () => {
  return (
    <nav className="container">
      <div className="nav">
        <div className="nav__start">
          <Link href="/">
            <a className="nav__logo">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="nav__end">
          <ul>
            <li>
              <LinkActive href="/" activeClassName='nav--active'>
                <a>Voluntários</a>
              </LinkActive>
            </li>
            <li>
              <LinkActive href="/sobre" activeClassName='nav--active'>
                <a>Sobre</a>
              </LinkActive>
            </li>
          </ul>
          <Link href="/sign-in">
            <a className="nav__auth">
                log in
            </a>
          </Link>
          <Link href="/sign-up">
            <a className="nav__auth--primary">
                inscrever
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
