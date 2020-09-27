const express = require('express')
const helmet = require('helmet')

const app = express();

app.use(helmet())

const port = 1000;

app.get('/*',(reg,res)=>{
    res.render('index.ejs')
});

app.listen(port);