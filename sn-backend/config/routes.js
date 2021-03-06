module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.user.save)
    app.get('/test', (req, res) => {
        app.db('users').select('name')
            .then(data => res.send(data)
            .catch(err => res.status(500).send('Fudeu')))
    })

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/users/:id/picture')
        .all(app.config.passport.authenticate())
        .post(app.api.user.saveProfilePicture)
        .put(app.api.user.saveProfilePicture)
        .get(app.api.user.getProfilePicture)

    app.route('/users/:id/bio')
        .all(app.config.passport.authenticate())
        .post(app.api.user.saveBio)
        .put(app.api.user.saveBio)

    app.route('/users/:id/friends')
        .all(app.config.passport.authenticate())
        .post(app.api.user.saveFriend)
        .get(app.api.user.getFriends)
        .put(app.api.user.removeFriend)

    app.route('/posts')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPosts)
        .post(app.api.post.save)

    app.route('/posts/post/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.post.save)
        .delete(app.api.post.remove)

    app.route('/posts/post/like/:id/:addOrRemove/:userId')
        .all(app.config.passport.authenticate())
        .put(app.api.post.likePost)

    app.route('/posts/post/:id/comment')
        .all(app.config.passport.authenticate())
        .post(app.api.post.saveComment)

    app.route('/posts/:userId')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getByUserId)

    app.route('/chats/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.chat.getChats)
        .post(app.api.chat.createChat)
}