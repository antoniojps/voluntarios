/* eslint-disable no-empty */
import { CURRENT_USER_QUERY } from './../graphql'
import Router from 'next/router'
import React from 'react'

// returns user prop
export async function withAuth(
  ctx,
  { redirectAuthenticated = false, redirectPublic = false, to = '/' },
) {
  try {
    const {data: { currentUser }} = await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
    });

    // redirect authenticated users
    if (redirectAuthenticated) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: to })
        ctx.res.end()
      } else Router.push(to)
    }
    // pass user to page
    return {
      user:  currentUser,
    }
  } catch (err) {
    // redirect unauthenticated
    if (redirectPublic) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: to })
        ctx.res.end()
      } else Router.push(to)
    }

    // pass user to page
    return {
      user: null,
    }
  }
}