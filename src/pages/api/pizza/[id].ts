import type { APIRoute } from "astro";
import { res } from "../utils/Response";
import { PizzaModel } from "../models/astrodb/pizza.model";

export const GET : APIRoute = async ({params, request}) => {
    const { id } = params;
    const json = await PizzaModel.getById({id})
    if (json.error) return res(json, 404, 'Not Found');
    return res(json, 200, 'OK');
}

export const DELETE : APIRoute = async ({params}) => {
    const { id } = params;
    const json = await PizzaModel.delete({id});
    return res(json, 200, 'OK');
}
