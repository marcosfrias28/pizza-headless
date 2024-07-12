import type { APIRoute } from "astro"
import { PizzaModel } from "../models/astrodb/pizza.model";

export const GET: APIRoute = async () => {
    const ingredients = await PizzaModel.getAllIngredients();
    return new Response(JSON.stringify(ingredients), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}