const app = require('express')()
const bd = require('./config/db')
const port = 8081

app.db = db

app.listen(port, () => {
    console.log('Running on port: ' + port)
})