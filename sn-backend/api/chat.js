module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', (id, name) => {
            usersOnline[id] = socket.id
        })
        socket.on('message', (msg, userId, senderId) => {
            socket.to(usersOnline[userId]).emit('message', msg, senderId)
        })
        socket.on('disconnect', () => {
            delete usersOnline[socket.id]
        })
    })
}

// vai precisar de banco de dados; talvez criar uma tabela para mensagens e outra para mensagens não vistas, mas eu não sei como fazer isso, faça o chat depois que cuidar dos comentários e da responsividade