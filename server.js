const SERVER_PORT = 5000
const io = require("socket.io")(SERVER_PORT, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

io.on('connection', socket => {
    console.log("connection started")
    console.log(socket.id)
    
    // receive from front-end
    socket.on("login", (client_id) => {
        console.log(`Login server side with id ${client_id}`)
        
        // send to wa app
        const id = client_id
        io.emit("login_wa", id)
    })

    socket.on("qr", (qr) => {
        console.log(qr)     // Send to front end instead of logging
        io.emit("qr_frontendSide", qr)
    })

    socket.on("board_status", (status) => {
        io.emit("board_statusFrontside", status)
    })

    socket.on("validate_numbers", (status) => {
        io.emit("board_statusFrontside", status)
    })

    socket.on("get_all_contact", () => {
        io.emit("get_all_contact_wa")
    })

    socket.on("get_all_contact_toFrontend", (data) => {
        io.emit("get_all_contact_fe", data)
    })

    socket.on("send_message", (status) => {
        io.emit("board_statusFrontside", status)
    })

    socket.on("send_media", (status) => {
        io.emit("board_statusFrontside", status)
    })

})

io.on('disconnection', socket => {
    console.log(`disconnected from ${socket.id}`)

    // send to wa app
    io.emit("login_wa", "disconnected")

})


/*   -- Features --   */

io.on('sendMessage', socket => {
    // send to wa app
    io.emit("login_wa", "disconnected")
})