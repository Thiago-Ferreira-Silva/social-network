module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.user.save)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

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
        .post(app.api.post.save)

    app.route('/posts/post:id')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getById)
        .put(app.api.post.save)

    app.route('/posts/:userId')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getByUserId)
}