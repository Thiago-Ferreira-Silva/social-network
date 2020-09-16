const { authSecret } = require('../.env')
const bcrypt = require('bcrypt')

module.exports = app => {

    const encriptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        //implemente  parte de atualizar o usuário

        const existentUser = await app.db('users')
                                        .where({ email: req.body.email })
                                        .first()

        if (existentUser) return res.status(400).send('User already exists')
        if (!user.name) return res.status(400).send('Enter the name')
        if (!user.email) return res.status(400).send('Enter the email')
        if (!user.password) return res.status(400).send('Enter the password')
        if (!user.confirmPassword) return res.status(400).send('Confirm the password')

        delete user.confirmPassword
        user.password = encriptPassword(req.body.password)

        app.db('users')
            .insert(user)
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'e-mail', 'password')
            .then( users => res.json(users))
            .catch( err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'e-mail', 'password')
            .where({ id: req.params.id })
            .first()
            .then( user => res.json(user))
            .catch( err => res.status(500).send(err) )
    }

    const remove = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .del()
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }

    return { save, get, getById, remove }
}