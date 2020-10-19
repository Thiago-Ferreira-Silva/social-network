const app = require('express')()
const db = require('./config/db')
const consign = require('consign')
const port = 8081

app.db = db

consign()
.include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log('Running on port: ' + port)
})

//está na hora de trabalhar no backend; vejas o resto das aulas do curso de bancos de dados e estruture tude para receber fotos de perfil e post de fotos
//talvez videos também
//faça algo como uma fusão do twitter com o instagram (porém muito mais simples)