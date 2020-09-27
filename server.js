const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')


const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server)

const port = 1000

app.use(morgan('tiny'))
app.use(helmet())
app.set('view engine','ejs')

app.use('/public', express.static('public'))

app.get('/',(reg,res)=>{
    res.render('index.ejs')
});

const gameServer = require('./gameServer.js')(io)



app.get('/*',(reg,res)=>{
    res.render('404.ejs')
});

server.listen(port);