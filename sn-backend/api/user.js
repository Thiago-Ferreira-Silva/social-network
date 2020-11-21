const bcrypt = require('bcrypt')

module.exports = app => {

    const encriptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        if (!user.name) return res.status(400).send('Enter the name')
        if (!user.email) return res.status(400).send('Enter the email')
        if (!user.password) return res.status(400).send('Enter the password')
        if (!user.confirmPassword) return res.status(400).send('Confirm the password')

        const existentUser = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (existentUser && !req.params.id) return res.status(400).send('User already exists')

        delete user.confirmPassword
        user.password = encriptPassword(req.body.password)

        if (req.params.id) {
            app.db('users')
                .where({ id: req.params.id })
                .update(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'password')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }//tirar isso

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'bio', 'profilePicture')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const saveProfilePicture = async (req, res) => {
        const profilePicture = {}
        profilePicture.image = req.body.image
        profilePicture.user_id = req.params.id

        const update = await app.db('profile_pictures')
            .where({ user_id: profilePicture.user_id })
            .first()
            .catch(err => res.status(500).send(err))

        if (update) {
            app.db('profile_pictures')
                .where({ user_id: profilePicture.user_id })
                .update(profilePicture)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('profile_pictures')
                .insert(profilePicture)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getProfilePicture = async (req, res) => {
        const picture = await app.db('profile_pictures')
            .where({ user_id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        if (picture) {
            picture.image = app.api.imageHandler.arrayToStringChar(picture.image)
            res.send(picture)
        } else {
            res.send(null)
        }
    }

    const saveBio = async (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .update({ bio: req.body.bio })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const saveFriend = async (req, res) => {
        const friend = req.body.friendId

        const data = await app.db('users')
            .select('friends')
            .where({ id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        const friends = JSON.parse(data.friends)

        if (!friends) {
            friends = []
        }

        friends.push(friend)

        app.db('users')
            .where({ id: req.params.id })
            .update({ friends: JSON.stringify(friends) })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        //talvez mudar o nome para follower
    }

    const getFriends = async (req, res) => {
        const data = await app.db('users')
            .select('friends')
            .where({ id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        const friends = JSON.parse(data.friends)
        const aaa = []
        friends.forEach(async friend => {
            await app.db('users')
                .select('id', 'name')
                .where({ id: friend })
                .first()
                .then(friend => aaa.push(friend))
                .catch(err => res.status(500).send(err))
                //resolva isso e crie um método para pegar a profile picture, coloque-o em imageHandler
            console.log('1', aaa)
        })
        console.log('2', aaa)
        res.status(204).send()
    }
    //criar uma checagem para que o usuário que fez o request não tenha acesso indevido a informacões de outros usuários
    //melhore o tratamento de erros

    return { save, get, getById, remove, saveProfilePicture, getProfilePicture, saveBio, saveFriend, getFriends }
}