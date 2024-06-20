import { validatePizza } from "../schema/pizzaSchema.js";

export class PizzaController {
    constructor({pizzaModel}) {
        this.pizzaModel = pizzaModel;
    }
    getAll = async (req, res) => {
        const {name, ingredients} = req.query;
        const pizza = await this.pizzaModel.getAllPizzas({name, ingredients});
        res.json(pizza);
    }
    getAllNames = async (req, res) => {
        const allNames = await this.pizzaModel.getAllNames();
        res.json(allNames);
    }
    getById = async (req, res) => {
        const { id } = req.params;
        const pizza = await this.pizzaModel.getById({id});
        if (pizza) return res.json(pizza);
        res.status(404).json({message: 'Pizza not found'});
     }
     create = async (req, res) => {
        const result = validatePizza(req.body);
        await this.pizzaModel.create({input: result});
        if (!result.success) {
            return res.status(400).json({message: 'Invalid pizza', errors: result.error});
        } else {
            res.status(201).json({message: 'Pizza created successfully'});
        }
      }
}

