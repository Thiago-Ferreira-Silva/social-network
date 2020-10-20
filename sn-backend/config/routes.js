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
        .post(app.api.user.addProfilePicture)
        .put(app.api.user.addProfilePicture)
        .get(app.api.user.getProfilePicture)
}