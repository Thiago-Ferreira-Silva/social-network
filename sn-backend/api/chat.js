module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', id => {
            usersOnline[socket.id] = id
            socket.join(id)
        })
        socket.on('message', (msg, userId) => {
            console.log(msg)
            socket.to(userId).emit('message', msg, usersOnline[socket.id])
        })
        socket.on('disconnect', () => {
            delete usersOnline[socket.id]
        })
    })
}