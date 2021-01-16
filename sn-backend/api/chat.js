module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', (id, name) => {
            usersOnline[id] = socket.id
        })
        socket.on('message', (msg, userId, senderId) => {
            console.log(msg)
            addMessage(senderId, userId, msg)
            socket.to(usersOnline[userId]).emit('message', msg, senderId)
            //dá pra melhorar; se mensagens forem enviadas em momentos muito próximos, elas podem ter a ordem trocada
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
            const [profilePicture, name] = await app.api.imageHandler.pickProfilePicture(req.params.id === chat.id1 ? chat.id2 : chat.id1)
            const messages = JSON.parse(chat.messages)

            return { ...chat, messages, profilePicture, name }
        })

        chats = await Promise.all(promisses)
        res.send(chats)
    }

    const addMessage = async (id1, id2, text) => {
        let newChat = false
        let chat = await app.db('chats')
            .where({ id1, id2 })
            .orWhere({ id1: id2, id2: id1 })
            .first()

        if (!chat) {
            chat = { id1, id2, messages: "[]" }
            newChat = true
        }

        const messages = JSON.parse(chat.messages)
        messages.push({ userId: id1, text })
        chat.messages = JSON.stringify(messages)

        if (newChat) {
            app.db('chats')
                .insert(chat)
                .then()
        } else {
            app.db('chats')
                .where({ id1, id2 })
                .orWhere({ id1: id2, id2: id1 })
                .update({ messages: JSON.stringify(messages) })
                .then()
        }
    }

    return { getChats }
}