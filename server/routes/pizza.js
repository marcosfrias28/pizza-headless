import { Router } from "express";
import { PizzaController } from "../controllers/pizza.js";

export const createPizzaRouter = ({pizzaModel}) => {
    const pizzaRoute = Router();

    const pizzaController = new PizzaController({pizzaModel});
    pizzaRoute.get('/', pizzaController.getAll)
    pizzaRoute.get('/names/', pizzaController.getAllNames)
    pizzaRoute.get('/:id', pizzaController.getById)
    pizzaRoute.post('/', pizzaController.create)

    return pizzaRoute;
}


