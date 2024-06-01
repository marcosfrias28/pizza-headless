const express = require('express');
const pizza = require('../api/pizza.json');


const app = express();
const PORT = process.env.PORT || 1234;

app.disable('x-powered-by'); // Disable the x-powered-by header

// Middleware per il parsing dei JSON
app.use(express.json())

app.get ('/api/', (req, res) => {
    res.json({messsage: 'Hello World!'});
})

app.get ('/api/pizza', (req, res) => {
    res.json(pizza);
})

app.use('', (req,res) => {
    res.status(404).send('<h1>404 NOT FOUND<h1/>Route not found');
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})