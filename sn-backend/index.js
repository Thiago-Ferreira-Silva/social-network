const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server ,{ cors: {origin: 'http://localhost:3000'}})
const db = require('./config/db')
const consign = require('consign')
const port = 8081

app.io = io
app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

server.listen(port, () => {
    console.log('Running on port: ' + port)
})