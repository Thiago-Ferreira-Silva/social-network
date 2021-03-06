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

    const getById = async (req, res) => {
        const user = await app.db('users')
            .select('id', 'name', 'bio')
            .where({ id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        const [profilePicture, ] = await app.api.imageHandler.pickProfilePicture(req.params.id)
        user.profilePicture = profilePicture
        res.send(user)
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
        const picture = await app.api.imageHandler.pickProfilePicture(req.params.id)
        res.send(picture)
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

        let friends = JSON.parse(data.friends)

        if (!friends) {
            friends = {}
        }

        friends[friend] = friend

        app.db('users')
            .where({ id: req.params.id })
            .update({ friends: JSON.stringify(friends) })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const getFriends = async (req, res) => {
        const data = await app.db('users')
            .select('friends')
            .where({ id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        const friendsId = JSON.parse(data.friends)

        if(friendsId) {
            const promises = Object.keys(friendsId).map(async id => {
                const friend = await app.db('users')
                        .select('id', 'name', 'bio')
                        .where({ id })
                        .first()
                        .catch(err => res.status(500).send(err))
                const [picture, ] = await app.api.imageHandler.pickProfilePicture(id)
            
                if (picture) friend.profilePicture = picture
                return friend
            })
    
            var friends = await Promise.all(promises)
        } else {
            var friends = {}
        }

        res.send(friends)
    }

    const removeFriend = async (req, res) => {
        const data = await app.db('users')
                        .select('friends') 
                        .where({id: req.params.id})
                        .first()
                        .catch(err => res.status(500).send())
        const friends = JSON.parse(data.friends)

        const friendId = req.body.friendId

        delete friends[friendId]

        app.db('users')
            .where({ id: req.params.id })
            .update({ friends })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { save, getById, saveProfilePicture, getProfilePicture, saveBio, saveFriend, getFriends, removeFriend }
}