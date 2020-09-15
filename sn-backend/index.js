const app = require('express')()
const db = require('./config/db')
const consign = require('consign')
const port = 8081

app.db = db

consign()
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log('Running on port: ' + port)
})