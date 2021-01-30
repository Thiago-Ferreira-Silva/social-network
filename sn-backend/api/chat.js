module.exports = app => {

    const usersOnline = {}

    app.io.on('connection', socket => {
        socket.on('online', (id) => {
            usersOnline[id] = socket.id
        })
        socket.on('message', async (msg, chatId, senderId) => {
            const userId = await addMessage(chatId, senderId, msg)
            socket.to(usersOnline[userId]).emit('message', msg, chatId)
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
            const [profilePicture, name] = await app.api.imageHandler.pickProfilePicture(req.params.id == chat.id1 ? chat.id2 : chat.id1)
            const messages = JSON.parse(chat.messages)

            return { ...chat, messages, profilePicture, name }
        })

        chats = await Promise.all(promisses)
        res.send(chats)
    }

    const createChat = async (req, res) => {
        const newChat = { ...req.body }

        await app.db('chats')
            .insert(newChat)
            .catch(err => res.status(500).send(err))

        const chat = await app.db('chats')
            .where(newChat)
            .first()
            .catch(err => res.status(500).send(err))

        const [profilePicture, name] = await app.api.imageHandler.pickProfilePicture(req.params.id === chat.id1 ? chat.id2 : chat.id1)
        const messages = JSON.parse(chat.messages)

        res.send({ ...chat, profilePicture, name, messages })
    }

    const addMessage = async (chatId, senderId, text) => {
        let chat = await app.db('chats')
            .where({ chatId })
            .first()

        const messages = JSON.parse(chat.messages)
        messages.push({ userId: senderId, text })
        chat.messages = JSON.stringify(messages)

        app.db('chats')
            .where({ chatId })
            .update({ messages: JSON.stringify(messages) })
            .then()

        return chat.id1 = senderId ? chat.id2 : chat.id1
    }

    return { getChats, createChat }
}