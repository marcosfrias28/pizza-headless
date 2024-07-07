import { defineMiddleware } from 'astro:middleware'
import jwt from 'jsonwebtoken'

const secretKey = process.env.TOKEN_SECRET as string

export const onRequest = defineMiddleware(async (context, next) => {
  console.log('Middleware is entered')

  const cookies = context.request.headers.get('cookie')

  console.log(cookies)

  const token = cookies
    ?.split('; ')
    .find((c) => c.startsWith('access-token='))
    ?.split('=')[1]

  console.log(token)

  if (token) {
    try {
      const user = jwt.verify(token, secretKey)
      context.locals = {
        ...context.locals,
        user
      }
    } catch (err) {
      return new Response('Invalid Token', { status: 401 })
    }
  }
  return next()
})
