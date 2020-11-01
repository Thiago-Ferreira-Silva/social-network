const { authSecret } = require('../.env')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email) return res.status(400).send('Enter the email')
        if (!req.body.password) return res.status(400).send('Enter the password')

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(400).send('Incorrect password')

        const picture = await app.db('profile_pictures')
            .where({ user_id: user.id })
            .first()
        const tipedArray = new Uint8Array(picture.image)
        const stringChar = String.fromCharCode.apply(null, tipedArray)
        picture.image = stringChar

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            iat: now,
            exp: now + (60 * 60 * 5) // mude isso
        }

        res.json({
            ...payload,
            bio: user.bio,
            friends: user.friends,
            profilePicture: picture ? picture.image : null,
            token: jwt.encode(payload, authSecret)
        })
    }

    //me parece uma boa fazer todas as requisições de profilePicture pela api correta, não por aqui

    const validateToken = async (req, res) => {
        const userData = req.body || null
        if (userData) {
            try {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
            catch (err) {
                res.send(false)
            }
        }
        res.send(false)
    }

    return { signin, validateToken }
}