const fs = require('fs')

module.exports = app => {

    const save = async (req, res) => {
        const post = { ...req.body }
        if (post.image) {
            const date = Date.now().toString()
            fs.writeFile(`../uploads/post_images/${post.user_id}-${date}.txt`, post.image, (err) => {
                if(err) res.status(500).send(err)
            })
            post.image = date
        }
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