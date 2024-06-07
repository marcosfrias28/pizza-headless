import express, { json } from 'express';
import pizza from '../api/pizza.json' with { type: "json" } ;
import cors from 'cors';
import crypto from 'crypto';
import { validatePizza } from './schema/pizzaSchema.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.disable('x-powered-by'); // Disable the x-powered-by header


// Middleware per il parsing dei JSON
app.use(json())
app.use(cors())

app.get('/api/pizza', (req, res) => {
    const {name, ingredients} = req.query;
    if (name) {
        const pizzaByName = pizza.filter(pizza => pizza.name.includes(name));
        return res.json(pizzaByName);
    }
    if (ingredients) {
        const pizzaByIngredients = pizza.filter(pizza => pizza.ingredients.some(ingredient => ingredient.toLowerCase() === ingredients.toLowerCase()));
        return res.json(pizzaByIngredients);
    }
    res.json(pizza);
    res.status(200);
})

app.post('/api/pizza', (req, res) => {
const result = validatePizza(req.body);
if (!result.success) {
    return res.status(400).json({message: 'Invalid pizza', errors: result.error});
} else {
    res.status(201).json({message: 'Pizza created successfully'});

}
const newPizza = {
    id: crypto.randomUUID(),
    ...result.data
}
pizza.push(newPizza);

})

app.get('/api/pizza/:id', (req, res) => {
    const { id } = req.params;
    const pizzaId = pizza.find(pizza => pizza.id === id);
    if (pizzaId) return res.json(pizzaId);
    res.status(404).json({message: 'Pizza not found'});
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})