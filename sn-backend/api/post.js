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

    const likePost = async (req, res) => {
        const likes = await app.db('posts')
                            .select('likes')
                            .where({ id: req.params.id })
                            .first()
                            .catch(err => res.status(500).send(err))

        const likedPosts = await app.db('users')
                                .select('likedPosts')
                                .where({ id: req.params.userId })
                                .first()
                                .catch(err => res.status(500).send(err))

        let likesNumber = likes.likes

        const liked = JSON.parse(likedPosts.likedPosts)

        if (req.params.addOrRemove === 'add') {
            likesNumber++
            liked[req.params.id] = req.params.id
        } else if (req.params.addOrRemove === 'remove') {
            likesNumber === 0 ? '' : likesNumber--
            delete liked[req.params.id]
        } else {
            res.status(404).send()
        }

        await app.db('users')
            .where({ id: req.params.userId })
            .update({ likedPosts: JSON.stringify(liked) })
            .catch(err => res.status(500).send(err))

        app.db('posts')
            .where({ id: req.params.id })
            .update({ likes: likesNumber })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        //e se dois usuários derem like no exato mesmo momento?
    }

    const saveComment = async (req, res) => {

    }

    return { save, getById, getByUserId, likePost, saveComment }
}