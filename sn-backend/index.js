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

//estruture tudo para receber fotos de perfil e post de fotos
//talvez videos também
//gbdb bmhp dpnp vmb gvtbp ep uxjuufs dpn p jotubhsbn