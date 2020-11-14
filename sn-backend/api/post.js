module.exports = app => {

    const save = (req, res) => {
        const post = { ...req.body }
        if (!post.text) return res.status(400).send('Write something')
        
        app.db('posts')
                .insert(post)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
    } //também deve ser possível atualizar um post

    const getById = (req, res) => {

    }

    const getByUserId = (req, res) => {

    }

    return { save, getById, getByUserId }
}