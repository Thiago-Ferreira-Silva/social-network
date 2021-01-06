module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', id => {
            usersOnline[socket.id] = id
            socket.join(id)
        })
        socket.on('message', (msg, userId) => {
            console.log(msg)
            console.log(userId)
            socket.join(userId)
            socket.to(userId).emit('message', msg, usersOnline[socket.id])
        })
        socket.on('disconnect', () => {
            delete usersOnline[socket.id]
        })
    })
}

// vai precisar de banco de dados; talvez criar uma tabela para mensagens e outra para mensagens não vistas, mas eu não sei como fazer isso, façã o chat depois que cuidar dos comentários a da responsividade