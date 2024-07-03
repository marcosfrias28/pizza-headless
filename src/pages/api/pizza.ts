import type { APIRoute, Params } from "astro";
import { PizzaModel } from "./models/astrodb/pizza.model.ts";
import { res } from "./utils/Response";
import { validatePizza } from "./validations/pizzaSchema";

export const GET : APIRoute = async ({params, request}: {params: Params;request: Request;}) => {
  const url = new URL(request.url);
  const { name, ingredients, perPage, page } = Object.fromEntries(url.searchParams);
  const json = await PizzaModel.getAllPizzas({ page: parseInt(page), perPage: parseInt(perPage), name, ingredients });
  if (json?.error) return res(json, 500, "Internal Server Error");
  return res(json, 200, "OK");
}

export const POST : APIRoute = async ({request}) => {
  const body = await request.json();
  const result = validatePizza(body);
  if (result.error) return res(result.error, 400, "Bad Request")
  const json = await PizzaModel.create(body);
  if (json.error) return res(json, 500, "Internal Server Error");
  return res(json, 200, "OK");
 }

 