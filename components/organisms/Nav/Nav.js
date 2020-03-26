import React, { useEffect } from 'react'
import Link from 'next/link'
import { Logo, LinkActive } from 'components/atoms'
import { AnimatePresence, motion } from 'framer-motion'

import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../graphql'
import { useRouter } from 'next/router'

const Nav = ({ skipAuth = false }) => {
  const client = useApolloClient();
  let cachedData = null
  const { asPath } = useRouter()

  const [loadUser, { data, error }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  // prevent useless fetching of the user for pages only
  // accessible for non-authenticated users
  // ex: sign in, sign up...
  useEffect(() => {
    if (!skipAuth) loadUser()
  }, [asPath, skipAuth])

  const renderList = () => (
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
  )

  const renderPublic = () => {
    return (
      <motion.div
        className="nav__end__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        key="unauthenticated"
      >
        {renderList()}
        <Link href="/sign-in">
          <a className={`nav__auth ${asPath === '/sign-in' && 'btn--disabled'} btn--small`} disabled>
              log in
          </a>
        </Link>
        <Link href="/sign-up">
          <a className={`nav__auth--primary ${asPath === '/sign-up' && 'btn--disabled'} btn--small`}>
              inscrever
          </a>
        </Link>
      </motion.div>
    )
  }

  const renderAuth = () => (
    <motion.div
      className="nav__end__inner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      key="authenticated"
    >
      {renderList()}
      <Link href="/sign-out">
        <a className="nav__auth btn--small">
          log out
        </a>
      </Link>
    </motion.div>
  )

  // get currentUser from cache to guess which one to show by default
  // if user in cache show auth version, else show public
  try {
    cachedData = client.readQuery({
      query: CURRENT_USER_QUERY,
      variables: {},
    });
  } catch (err) {
    cachedData = null
  }

  const showAuth =  data && data.currentUser && !error
  const renderNavRight = () => {
    const cachedUser = cachedData && cachedData.currentUser
    if (skipAuth) return renderPublic()
    if (cachedUser || showAuth) return renderAuth()
    else return renderPublic()
  }

  return (
    <nav className="nav">
      <div className="nav__start">
        <Link href="/">
          <a className="nav__logo">
            <Logo />
          </a>
        </Link>
      </div>
      <div className="nav__end">
        <AnimatePresence initial={false} exitBeforeEnter>
          {renderNavRight()}
        </AnimatePresence>
      </div>
      <style jsx global>{`
      @import "assets/styles/mixins.scss";
      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-xs4) 0px;
        height: 56px;
        &__end {
          display: flex;
          align-items: center;
          &__inner {
            display: flex;
            align-items: center;
          }
        }
        &__logo {
          padding: var(--spacing-xs);
          padding-left: 0;
        }
        a {
          text-decoration: none;
          color: var(--base40);
          transition: color 140ms,fill 140ms;
          &.nav--active, &:hover {
            color: var(--base);
          }
          &.nav__auth {
            margin-left: var(--spacing-xs);
            @include button;
          }
          &.nav__auth--primary {
            margin-left: var(--spacing-xs);
            @include button--primary;
          }
        }
        ul {
          list-style: none;
          display: flex;
          li {
            margin-left: var(--spacing-xs);
            font-size: var(--size-s);
            font-weight: 600;
            margin-bottom: 0;
            &:before {
              content: '';
            }
          }
        }
      }
      `}</style>
    </nav>
  )
}

export default Nav

