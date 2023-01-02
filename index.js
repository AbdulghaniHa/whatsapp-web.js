const repl = require('repl');
const { Client, LocalAuth } = require('./helpers');
const { io } = require("socket.io-client");
const { Message, ClientInfo, Buttons } = require('./src/structures');
const { update, getStatus } = require('./sandbox')

const a = getStatus("1111")
console.log("a:", a)

const SERVER_PORT = "http://localhost:5000"
const socket = io(SERVER_PORT)
let clientStatus = {
    id: "",
    status: "disconnected"
}

console.log('Initializing...');

socket.on("connect", () => {
    console.log(`you connected to id ${socket.id}`)

    /*
        on socket "login" init whatsapp client

    */
})
socket.on("login_wa", (client_id) => {

    // validate if client id is connected or not from logs 
    console.log(client_id)
    console.log(clientStatus)
    if (clientStatus.status !== "disconnected") return;

    // check if client logged in, if not init client and send qr code
    

    console.log('User logging in !')
    const client = new Client({
        puppeteer: { headless: false },
        
        // auth with unqiue id 
        authStrategy: new LocalAuth()
    });

    client.initialize();

    client.on('qr', (qr) => {
        clientStatus = {id: client_id, status: "connected"}
        console.log(qr)
        socket.emit("qr", qr)
        socket.emit("board_status", "readQR")
    });

    client.on('authenticated', () => {
        // emit loading auth
    });

    client.on('ready', () => {
        console.log("App is ready")
        socket.emit("board_status", "ready")
        clientStatus = {id: client_id, status: "ready"}
        
        const body = "What's the best ai model"
        const body_array = [
            {body:'Dalle2'},
            {body:'Stable diffusion'},
            {body:'Mid journey'},
            {body:"Unsubscribe to this news"},
        ]
        const title = ""
        const footer = ""

        //  RIYAD 54 121 9541
        // let button = new Buttons(body, body_array, title, footer);
        // client.sendMessage("966541219541@c.us", button)

        // client.sendMessage("966509739698@c.us", button)

        // emit app is ready
    });

    client.on('disconnected', () => {
        console.log("User disconnected")
        clientStatus = {id: client_id, status: "disconnected"}
    });


    /*   -- Features --   */
    
    client.on('message', (message) => {
        const body = ""
        const title = ""
        const footer = ""
        console.log(message)
        // let button = new Buttons(body,[{body:'عبدالغني'},{body:'حران'},{body:'برضو عبدالغني'}], title, footer);
        // client.sendMessage("966509739698@c.us", button)
        if(message.type === "buttons_response"){
            let res = message.body
            let req = "Unsubscribtion done"
            // get req message(res)
            if (message.body === "Unsubscribe to this news") client.sendMessage("966509739698@c.us", req)
            
            
        }
    });

    socket.on('get_all_contact_wa', async () => {
        const req = await client.getContacts()
        // const qq = await client.isRegisteredUser(i._serialized)
        // console.log(qq) 
        
        const array = []
        const all_contacts = req.filter((i) => {
            const Name = i.name ? i.name : ""
            const shortName = i.pushname ? i.pushname : ""
            const Number = i.number ? i.number : ""

            const isMyContact = i.isMyContact? i.isMyContact: false
            const isWAContact = i.isWAContact? i.isWAContact: ""

            if (!Number) return;
            array.push(
                {
                    "Name": Name,
                    "shortName": shortName,
                    "Number": Number,
                    "isMyContact": isMyContact,
                    "isWAContact": isWAContact
                }
            )
            
        })
        socket.emit("get_all_contact_toFrontend", array)
        // console.log(req)
    });

    socket.on('brodcast_wa', async () => {
        const req = await client.getContacts()
        const qq = await client.isRegisteredUser("966509739698@c.us")
        
        console.log(qq) 
        
        const array = []
        const all_contacts = req.filter((i) => {
            const Name = i.name ? i.name : ""
            const shortName = i.pushname ? i.pushname : ""
            const Number = i.number ? i.number : ""
            if (!Number) return;

            console.log(all_contacts)

            array.push(
                {
                    "Name": Name,
                    "shortName": shortName,
                    "Number": Number,
                    "isSubscribed": ""
                }
            )
            
        })
        socket.emit("get_all_contact_toFrontend", array)
    });
})

socket.on("disconnect", () => {
    console.log(`you disconnected to id ${socket.id}`)

    /*
        on socket "login" init whatsapp client

    */
})
