/* eslint-disable no-empty */
import { CURRENT_USER_QUERY } from './../graphql'
import Router from 'next/router'

export async function redirectAuthenticated(ctx, to = '/') {
  try {
    const user = await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
      fetchPolicy: 'no-cache',
    })
    if (user) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: to })
        ctx.res.end()
      } else Router.push('/')
    }
  } catch (err) { }
}

export async function redirectPublic(ctx, to = '/') {
  try {
    await ctx.apolloClient.query({
      query: CURRENT_USER_QUERY,
      fetchPolicy: 'no-cache',
    })
  } catch (err) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: to })
        ctx.res.end()
      } else Router.push('/')
  }
}