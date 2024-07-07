import type { APIContext, APIRoute } from 'astro'
import { validateUser } from '../validations/userSchema'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/astrodb/user.model'
import { res } from '../utils/Response'

interface ValidationResponse {
  success?: boolean
  error?: string
}

export const POST: APIRoute = async ({ request }: APIContext) => {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // ZOD back-end Validations for user registration
  const validation = (await validateUser({
    name,
    email,
    password
  })) as ValidationResponse

  if (validation.error) { return res(validation, 400, 'Bad Request') }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { name, email, password: hashedPassword }
    const registeredUser = await UserModel.register(user)
    return res(registeredUser, 200, 'OK')
  } catch {
    return res({ error: 'Error creating user' }, 500, 'Internal Server Error')
  }
}
