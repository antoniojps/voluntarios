import React, { useEffect } from 'react'
import Link from 'next/link'
import { Logo, LinkActive } from 'components/atoms'
import { AnimatePresence, motion } from 'framer-motion'
import './Nav.module.scss'

import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks';
import { createApolloClient } from 'apollo/client'
import { CURRENT_USER_QUERY } from '../../../graphql'
import { useRouter } from 'next/router'

const client = createApolloClient()

const Nav = () => {
  const { asPath } = useRouter()

  const [loadUser, { data, error }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'no-cache',
  })

  console.log({data, error})

  useEffect(() => {
    loadUser()
  }, [asPath])

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
        <AnimatePresence initial={false} exitBeforeEnter>
            {data && data.currentUser && !error && (
              <motion.div
                className="nav__end__inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="authenticated"
              >
                {renderList()}
                <Link href="/sign-out">
                  <a className="nav__auth">
                    log out
                  </a>
                </Link>
              </motion.div>
            )}
            {error && (!data || !data.currentUser) && (
              <motion.div
              className="nav__end__inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="unauthenticated"
            >
              {renderList()}
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
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Nav />
  </ApolloProvider>
)
