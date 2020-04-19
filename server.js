var express = require('express')

var app = express()
var bodyParse = require('body-parser');
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose');
var messages = [
    {name: "Yasir", message: "hello"},
    {name: "Shiva", message: "hi"}
]

app.use(express.static(__dirname))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))


app.get('/messages', (req, res) =>{
    res.send(messages)
});
app.post('/messages', (req, res) =>{
    console.log(req.body)
    messages.push(req.body)
    io.emit('message', req.body)   
    //console.log(req.body)     //this line is not working because express does not have built in support tp parse the body.. we should install the package that do that call body-parser.
    res.sendStatus(200)
});
io.on('connection', (socket) =>{
    console.log('user connected')
})
var server = http.listen(3000, () =>{

    console.log('server is running on port', server.address().port)
})