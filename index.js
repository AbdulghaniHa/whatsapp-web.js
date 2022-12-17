const repl = require('repl');
const { Client, LocalAuth } = require('./helpers');

const client = new Client({
    puppeteer: { headless: false }, 
    authStrategy: new LocalAuth()
});

console.log('Initializing...');

client.initialize();

client.on('qr', () => {
    console.log('Please scan the QR code on the browser.');
});

client.on('authenticated', (session) => {
    console.log(JSON.stringify(session));
});

client.on('ready', () => {
});
