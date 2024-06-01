import express from 'express';
const app = express();
const PORT = process.env.PORT || 1234;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
app.disable('x-powered-by'); // Disable the x-powered-by header

app.use(express.json())

app.get ('/', (req, res) => {
    res.json({messsage: 'Hello World!'});
})

app.get ('/pizza', (req, res) => {
    res.json({messsage: 'Tutte le pizze!'});
})

app.use('', (req,res) => {
    res.status(404).send('<h1>404 NOT FOUND<h1/>Route not found');
})