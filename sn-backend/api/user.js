module.exports = app => {

    const save = (req, res) => {

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