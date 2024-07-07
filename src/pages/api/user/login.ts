import { type APIContext, type APIRoute } from 'astro'
import { UserModel } from '../models/astrodb/user.model'
import { res } from '../utils/Response'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config() // Load the environment variables

export const POST: APIRoute = async ({ request }: APIContext) => {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const loginResult = await UserModel.login({ email, password })

  // If there is an error, return a 400 status code
  if (loginResult?.error) {
    return res({ error: loginResult.error }, 400, 'Bad Request')
  }

  // Create a token and set it as a cookie
  const { user } = loginResult
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string, {
    expiresIn: '1h'
  })

  return new Response(JSON.stringify(loginResult), {
    status: 200,
    headers: {
      'Set-Cookie': `access-token=${token}; HttpOnly; Max-Age=3600; Path=/`,
      'Content-Type': 'application/json'
    }
  })
}
