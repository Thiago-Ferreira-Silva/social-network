module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        console.log('connected')
        socket.on('online', id => {
            usersOnline[id] = socket.id
        })
        socket.on('message', (msg, userId, senderId) => {
            console.log(msg)
            console.log(userId)
            socket.to(usersOnline[userId]).emit('message', msg, senderId)
        })
        socket.on('disconnect', () => {
            delete usersOnline[socket.id]
            console.log('disconnected')
        })
    })
}

// vai precisar de banco de dados; talvez criar uma tabela para mensagens e outra para mensagens não vistas, mas eu não sei como fazer isso, faça o chat depois que cuidar dos comentários e da responsividade