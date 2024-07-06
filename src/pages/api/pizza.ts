import type { APIRoute } from "astro";
import { PizzaModel } from "./models/astrodb/pizza.model";
import { res } from "./utils/Response";
import { validatePizza } from "./validations/pizzaSchema";

interface RequestGetJSON {
  name?: string;
  ingredients?: string;
  perPage?: number;
  page?: number;
  error?: string;
  message?: string;
  success?: string;
}

export const GET : APIRoute = async ({request}: {request: Request;}) => {
  const url = new URL(request.url);
  const { name, ingredients, perPage, page } = Object.fromEntries(url.searchParams);
  const pizza = await PizzaModel.getAllPizzas({ page: parseInt(page), perPage: parseInt(perPage), name, ingredients }) as RequestGetJSON;
  if (pizza?.error) return res(pizza, 400, "Bad Request")
  return res(pizza, 200, "OK");
}

export const POST : APIRoute = async ({request}) => {
  const body = await request.json();
  const result = validatePizza(body);
  if (result.error) return res(result.error, 400, "Bad Request")
  const json = await PizzaModel.create(body);
  if (json.error) return res(json, 400, "Bad Request")
  return res(json, 200, "OK");
 }