module.exports = app => {

    const save = (req, res) => {
        const post = { ...req.body }
        if (!post.text) return res.status(400).send('Write something')
        post.date = new Date().toISOString()

        app.db('posts')
            .insert(post)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } //também deve ser possível atualizar um post

    const getById = async (req, res) => {
        const id = req.params.id

        const post = await app.db('posts')
            .where({ id: id })
            .first()
            .catch(err => res.status(500).send(err))

        if (post.image) {
            post.image = app.api.imageHandler.arrayToStringChar(post.image)
        }

        res.send(post)
    }

    const getByUserId = async (req, res) => {
        const id = req.params.userId

        let posts = await app.db('posts')
            .where({ user_id: id })
            .catch(err => res.status(500).send(err))
        posts = posts.map((post) => {
            if (post.image) {
                const image = app.api.imageHandler.arrayToStringChar(post.image)
                return { ...post, image }
            }
            return post
        })

        res.json(posts)
    }

    return { save, getById, getByUserId }
}