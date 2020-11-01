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
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'password')
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
                .then(_ => res.status(204).send() )
                .catch(err => res.status(500).send(err))
        }
        //ainda tem problemas com imagens grandes, talvez usar Array.reduce()
    }

    const getProfilePicture = async (req, res) => {
        const picture = await app.db('profile_pictures')
            .where({ user_id: req.params.id })
            .first()
            .catch(err => res.status(500).send(err))

        const tipedArray = new Uint8Array(picture.image)
        const stringChar = String.fromCharCode.apply(null, tipedArray)
        picture.image = stringChar

        res.send(picture)
    }

    const saveBio = async (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .update({ bio: req.body.bio })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove, saveProfilePicture, getProfilePicture, saveBio }
}

//talvez mover tudo relacionado a upload de arquivos para outro arquivo
//criar os métodos para a coluna friends