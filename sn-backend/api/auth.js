const { authSecret } = require('../.env')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

module.exports = app => {
    const signin= async (req, res) => {
        const user = await app.db('users')
                        .where({ email: req.body.email })
                        .first()

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Incorrect password')

        const now = Math.floor(Date.now()/1000)

        const payload = {
            id: user.id,
            name: user.name,
            iat: now,
            exp: now + (60*60) // mude isso
        }

        res.json({
            ...payload, //isso é necessário?
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp*1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(err) {
            res.status(500).send(err)
        }

        res.send(false)
    }

    return { signin, validateToken }
}