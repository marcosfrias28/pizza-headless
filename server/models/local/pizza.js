import { readJSON } from "../../utils/readJSON.js";

const pizza = readJSON('../pizza.json');

export class PizzaModel {
    static async getAllPizzas({name, ingredients}) {
        if (name) {
            return pizza.filter(pizza => pizza.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (ingredients) {
            return pizza.filter(pizza => pizza.ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredients.toLowerCase())));
        }
        return pizza;
     }
    static async getById({id}) {
        const pizzaFound = pizza.find(pizza => pizza.id === id);
        return pizzaFound;
     }
    static async create({input}) {
        const newPizza = {
            id: crypto.randomUUID(),
            ...input.data
        }
        pizza.push(newPizza);
     }

}