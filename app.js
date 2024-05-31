const express = require('express');


const app = express();

app.disable('x-powered-by'); // Disable the x-powered-by header


app.get ('/', (req, res) => {
    res.json({messsage: 'Hello World!'});
    
})