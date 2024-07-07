import type { APIRoute } from 'astro'
import { res } from '../utils/Response.ts'
import { PizzaModel } from '../models/astrodb/pizza.model.ts'

interface Json {
  error?: string
}

export const GET: APIRoute = async ({ params }) => {
  const { id } = params
  if (!id) return res({ error: 'Missing id' }, 400, 'Bad Request')
  const json = await PizzaModel.getById({ id }) as Json
  if (json.error) return res(json, 404, 'Not Found')
  return res(json, 200, 'OK')
}

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params
  if (!id) return res({ error: 'Missing id' }, 400, 'Bad Request')
  const json = await PizzaModel.delete({ id })
  return res(json, 200, 'OK')
}
