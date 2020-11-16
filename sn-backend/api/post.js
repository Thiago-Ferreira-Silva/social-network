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
        const id = req.params.id

        app.db('posts')
            .where({ id: id })
            .then(posts => res.json(posts))
            .catch(err => res.status(500).send(err))
    }

    const getByUserId = async (req, res) => {
        const id = req.params.userId

        const posts = await app.db('posts')
            .where({ user_id: id })
            .catch(err => res.status(500).send(err))

        posts = posts.map((post) => {
            if (post.image) {
                post.image = app.arrayToStringChar(post.image)
            }
        })

        res.json(posts)
    }

    return { save, getById, getByUserId }
}