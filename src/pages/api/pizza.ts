import type { APIRoute } from 'astro'
import { PizzaModel } from './models/astrodb/pizza.model'
import { res } from './utils/Response'
import { validatePizza } from './validations/pizzaSchema'
import type { Pizza } from '../../types/PizzaType'

interface RequestGetJSON {
  name?: string
  ingredients?: string
  perPage?: number
  page?: number
  error?: string
  message?: string
  success?: string
}

type PostPizzaReturn = {
  error?: string
  success?: string
}

export const GET: APIRoute = async ({ request }: { request: Request }) => {

  //Documentation writted by @Marcosfrias28 on 11/07/2024
  /* 
  Query params: query params are used to filter the pizzas by name, ingredients
  */
  const url = new URL(request.url)
  const { name, ingredients, perPage, page } = Object.fromEntries(url.searchParams)
  const pizza = await PizzaModel.getAllPizzas({ page: parseInt(page), perPage: parseInt(perPage), name, ingredients }) as RequestGetJSON
  if (pizza?.error) return res(pizza, 400, 'Bad Request')
  return res(pizza, 200, 'OK')
}

export const POST: APIRoute = async ({ request }) => {

  //Documentation writted by @Marcosfrias28 on 11/07/2024
  /*
Body example:
{
  "name": "Pizza",
  "price": 10.99,
  "cover": "https://example.com",
  "ingredients": ["cheese", "pepperoni"]
}
*/
  const body: Pizza = await request.json()
  console.log(body);

  /*
    validatePizza function is a ZOD schema that validates the body of the request.
    If name is not a string, price is not a number, cover is not a string or ingredients is not an array of strings,
    it will return an error
  */
  const pizzaValidation = validatePizza(body)

  // If there is an error on the validation, it will return a 400 status code with the error message
  if (pizzaValidation.error != null) return res(pizzaValidation.error, 400, 'Bad Request')

  /* If everything is correct, it will create a new pizza and gonna 
add Ingredients to Ingredient table and PizzaIngredient table with the references */
  const json: PostPizzaReturn = await PizzaModel.create(body)
  if (json?.error) return res(json, 400, 'Bad Request')
  return res(json, 200, 'OK')
}
