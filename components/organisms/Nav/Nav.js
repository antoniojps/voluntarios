import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Logo, LinkActive, Avatar } from 'components/atoms'
import { AnimatePresence, motion } from 'framer-motion'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../graphql'
import { useRouter } from 'next/router'
import { Spacer } from '@zeit-ui/react'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components/atoms'
import '../../atoms/Badge/Badge.module.scss'

const Nav = ({ skipAuth = false }) => {
  const [navMobileOpen, setNavMobileOpen] = useState(false);
  const client = useApolloClient();
  let cachedData = null
  const { asPath } = useRouter()
  const [loadUser, { data, error }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  })
  const mobileNav = useRef(null);
  // prevent useless fetching of the user for pages only
  // accessible for non-authenticated users
  // ex: sign in, sign up...
  useEffect(() => {
    if (!skipAuth) loadUser()
  }, [asPath, skipAuth])

  useEffect(() => {
    if (navMobileOpen) {
      disableBodyScroll(mobileNav.current)
    } else {
      enableBodyScroll(mobileNav.current);
    }
  }, [navMobileOpen])

  useEffect(() => {
    return () => clearAllBodyScrollLocks();
  })

  const toggleMobileNav = () => {
    setNavMobileOpen(false)
  }

  const renderList = () => {
    const cachedUser = cachedData && cachedData.currentUser
    const isAuth = cachedUser || showAuth;

    return (
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

        {isAuth && (
          <li>
            <Link href="/sign-out" >
              <a className="nav__auth btn--small" disabled>
                sair
              </a>
            </Link>
          </li>
        )}
      </ul>
    )
  }

  const renderMobileList = () => {
    const cachedUser = cachedData && cachedData.currentUser
    const isAuth = cachedUser || showAuth;

    return (
      <ul>
        <li onClick={toggleMobileNav}>
          <LinkActive href="/" activeClassName='nav--active'>
            <a>Voluntários</a>
          </LinkActive>
        </li>
        <li onClick={toggleMobileNav}>
          <LinkActive href="/sobre" activeClassName='nav--active'>
            <a>Sobre</a>
          </LinkActive>
        </li>
        {isAuth && (
          <li onClick={toggleMobileNav}>
            <Link href="/sign-out">
              <a>sair</a>
            </Link>
          </li>
        )}
        {!isAuth && (
          <>
            <li onClick={toggleMobileNav}>
              <LinkActive href="/sign-in" activeClassName='nav--active'>
                <a>Log in</a>
              </LinkActive>
            </li>
            <li onClick={toggleMobileNav}>
              <LinkActive href="/sign-up" activeClassName='nav--active'>
                <a>Voluntariar</a>
              </LinkActive>
            </li>
          </>
        )}
        <Spacer y={1} />
        <div className="badge badge--mini badge--inverse">
            #fightcovid19
        </div>
      </ul>
    )
  }

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
            voluntariar
          </a>
        </Link>
      </motion.div>
    )
  }

  const renderPublicMobile = () => {
    return (
      <motion.div
        className="nav-mobile__end__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        key="unauthenticated"
      >
        <Link href="/sign-up">
          <a className={`nav__auth--primary ${asPath === '/sign-up' && 'btn--disabled'} btn--small`}>
            voluntariar
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
      <Spacer x={1} />
      <Link href="/profile">
        <a className="nav__profile">
          <Avatar size='sm' />
        </a>
      </Link>
    </motion.div>
  )

  const renderAuthMobile = () => {
    return (
      <motion.div
        className="nav__end__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        key="authenticated"
      >
        <Spacer x={1} />
        <Link href="/profile">
          <a className="nav__profile">
            <Avatar size='sm' />
          </a>
        </Link>
      </motion.div>
    )
  }

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

  const showAuth = data && data.currentUser && !error
  const renderNavRight = () => {
    const cachedUser = cachedData && cachedData.currentUser
    if (skipAuth) return renderPublic()
    if (cachedUser || showAuth) return renderAuth()
    else return renderPublic()
  }

  const renderNavRightMobile = () => {
    const cachedUser = cachedData && cachedData.currentUser
    if (skipAuth) return renderPublicMobile()
    if (cachedUser || showAuth) return renderAuthMobile()
    else return renderPublicMobile()
  }

  return (
    <>
      <nav className="nav">
        <div className="nav__start">
          <Link href="/">
            <a className="nav__logo">
              <Logo />
            </a>
          </Link>

          <Spacer x={0.25} />
          <div className="badge-desktop badge badge--mini badge--inverse">
            #fightcovid19
          </div>
        </div>
        <div className="nav__end">
          <AnimatePresence initial={false} exitBeforeEnter>
            {renderNavRight()}
          </AnimatePresence>
        </div>
        <div className="nav-mobile__end">
          <div
            onClick={() => setNavMobileOpen(!navMobileOpen)}
            className='navigation__icon'
          >
            <Icon
              icon={navMobileOpen ? faTimes : faBars}
            />
          </div>
          <AnimatePresence initial={false} exitBeforeEnter>
            {renderNavRightMobile()}
          </AnimatePresence>
        </div>

      </nav>
      {navMobileOpen && (
        <div className='nav-mobile-content' ref={mobileNav}>
          <div className="container">
            {renderMobileList()}
          </div>
        </div>
      )}

      <style jsx global>{`
      @import "assets/styles/mixins.scss";
      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-xs4) 0px;
        height: 56px;
        &__start {
          display: flex;
          align-items: center;
        }
        &__end {
          display: flex;
          @media (max-width: 768px) {
            display: none;
          }
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
        .nav-mobile__end {
          @media (min-width: 768px) {
            display: none;
          }
          .navigation__icon {
            cursor: pointer;
            position: relative;
            height: 20px;
            width: 20px;
          }
          display: flex;
          align-items:center;
        }
      }
      .nav-mobile-content {
        width: 100%;
        height: 100%;
        background: var(--bg);
        position: absolute;
        z-index: 100;
        left: 0;
        overflow: hidden;

        ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;

          li {
            font-size: var(--size-m);
            font-weight: 600;
            width: 100%;
            margin: 0;
            cursor: pointer;
            border-bottom: 1px solid var(--border20);
            padding: var(--spacing-xs3) 0;

            &:hover {
              border-bottom: 1px solid var(--border);
            }

            a {
              height: 100%;
              width: 100%;
              display: block;
              color: var(--base);
            }

            &:before {
              content: '';
            }
          }
        }
      }
      @include screen(md) {
        .badge-desktop {
          display: none;
        }
      }
      `}</style>
    </>
  )
}

export default Nav

