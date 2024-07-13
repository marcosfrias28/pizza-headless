import type { APIRoute } from 'astro'
import { res } from '../utils/Response.ts'
import { PizzaModel } from '../models/astrodb/pizza.model.ts'

interface Json {
  error?: string
}

type id = `${string}-${string}-${string}-${string}-${string}` | undefined

export const GET: APIRoute = async ({ params }) => {
  if (!params.id) return res({error: 'Missing id'},400, 'Bad Request')
  const id = params.id as id
  const json = await PizzaModel.getById(id) as Json
  if (json.error) return res(json, 404, 'Not Found')
  return res(json, 200, 'OK')
}

export const DELETE: APIRoute = async ({ params }) => {
  if (!params.id) return res({ error: 'Missing id' }, 400, 'Bad Request')
  const id = params?.id as id
  const json = await PizzaModel.delete(id)
  return res(json, 200, 'OK')
}
