const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }})

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})
let i = 0
io.on('connection', socket => {
    if (i<1) {
        console.log('somebody connected')
        i++
    }
    io.emit('hello', 'Hello!')
    socket.on('message', msg => console.log(msg))
    socket.on('disconnect', () => console.log('somebody disconnected'))
})

server.listen(8082, () => console.log('Listenning on 8082 ...'))