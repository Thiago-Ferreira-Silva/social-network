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

    const getChats = async (req, res) => {
        let chats = await app.db('chats')
                            .where({ id1: req.params.id })
                            .orWhere({ id2: req.params.id })
                            .catch(err => res.status(500).send(err))

        const promisses = chats.map(async chat => {
            const [profilePicture, name ] = await app.api.imageHandler.pickProfilePicture(req.params.id === chat.id1 ? id2 : id1)
            const messages = JSON.parse(chat.messages)

            return { ...chat, messages, profilePicture, name }
        })

        chats = await Promise.all(promisses)

        res.send(chats)
    }

    return { getChats }
}