module.exports = app => {
    app.io.on('connection', socket => {
        app.io.emit('hello', 'hello')
        socket.on('message', msg => {
            console.log(msg)
        })
        socket.on('disconnect', () => {
            console.log('An user has disconnected')
        })
    })
}