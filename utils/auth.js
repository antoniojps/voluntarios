/* eslint-disable no-empty */
import { CURRENT_USER_QUERY } from './../graphql'
import Router from 'next/router'

export async function redirectAuthenticated(ctx, to = '/') {
  try {
    await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
      fetchPolicy: 'no-cache',
    })
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: to })
      ctx.res.end()
    } else Router.push('/')
    return {}
  } catch (err) {
    return {}
  }
}

export async function redirectPublic(ctx, to = '/') {
  try {
    await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
      fetchPolicy: 'no-cache',
    })
    return {}
  } catch (err) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: to })
        ctx.res.end()
      } else Router.push('/')
    return {}
  }
}

// returns user prop
export async function getUserProp(ctx) {
  try {
    const {data: { currentUser }} = await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
    });
    return {
      user:  currentUser,
    }
  } catch (err) {
    return {
      user: null,
    }
  }
}