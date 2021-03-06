const { authSecret } = process.env.ENV ?
    { authSecret: process.env.authSecret } : require('../.env')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email) return res.status(400).send('Enter the email')
        if (!req.body.password) return res.status(400).send('Enter the password')

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
            .catch(err => res.status(500).send(err))
        
        if (!user) return res.status(400).send('User does not exist')

        const picture = await app.db('profile_pictures')
            .where({ user_id: user.id })
            .first()
            .catch(err => res.status(500).send(err))

        if (picture) {
            image = app.api.imageHandler.arrayToStringChar(picture.image)
        } else {
            image = null
        }

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(400).send('Incorrect password')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            iat: now,
            exp: now + (60 * 60 * 10)
        }

        res.json({
            ...payload,
            bio: user.bio,
            friends: user.friends,
            likedPosts: JSON.parse(user.likedPosts),
            profilePicture: image,
            token: jwt.encode(payload, authSecret)
        })
    }

    return { signin }
}