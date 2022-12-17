const SERVER_PORT = 5000
const socket_io = require("socket.io")(SERVER_PORT, {
    cors: {
        origin: ['*']
    }
})

socket_io.on('connection', socket => {
    console.log("connection started")
    console.log(socket.id)
})
