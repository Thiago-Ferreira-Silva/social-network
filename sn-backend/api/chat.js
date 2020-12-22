/*module.exports = app => {
    app.io.on('connection', socket => {
        //console.log('An user has connected')
        app.io.emit('hello', 'hello')
        socket.on('message', msg => {
            console.log(msg)
        })
        socket.on('disconnect', () => {
            //console.log('An user has disconnected')
        })
    })
}*/

/*
Não está nem perto de funcionar.
Talvez seja necessário criar um outro server só para o chat
*/