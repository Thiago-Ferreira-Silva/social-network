module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', (id) => {
            usersOnline[id] = socket.id
        })
        socket.on('message', (msg, userId, senderId) => {
            addMessage(senderId, userId, msg)
            socket.to(usersOnline[userId]).emit('message', msg, senderId)
            //dá pra melhorar; se mensagens forem enviadas em momentos muito próximos,
            //elas podem ter a ordem trocada (testar isso)
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
    //é melhor chamar esses métodos através do socket?
    const createChat = (req, res) => {
        const newChat = { ...req.body }

        app.db('chats')
            .insert(newChat)
            .then(chat => res.send(chat))
            .catch(err => res.status(500).send(err))
    }
    // mover a parte de newChat para getChats e criar o getChatById ou algo do tipo (ou talvez um createChat)
    const addMessage = async (id1, id2, text) => {
        let chat = await app.db('chats')
            .where({ id1, id2 })
            .orWhere({ id1: id2, id2: id1 })
            .first()

        const messages = JSON.parse(chat.messages)
        messages.push({ userId: id1, text })
        chat.messages = JSON.stringify(messages)

        app.db('chats')
            .where({ id1, id2 })
            .orWhere({ id1: id2, id2: id1 })
            .update({ messages: JSON.stringify(messages) })
            .then()
    }

    return { getChats, createChat }
}