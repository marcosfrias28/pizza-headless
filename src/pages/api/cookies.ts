import type { APIContext, APIRoute } from 'astro'
import { res } from './utils/Response'

export const GET: APIRoute = async (context: APIContext) => {
  const cookies = context.request.headers.get('cookie')
  console.log(cookies)
  if (!cookies) res({ error: 'Not cookies found' }, 200, 'OK')
  return res(JSON.stringify(cookies), 200, 'OK')
}
