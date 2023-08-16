const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
const fs = require('fs');
const axios = require('axios');

const SESSION_FILE_PATH = './session.json';
const OPEN_WEATHER_API_KEY = 'b99ec1349de4aa78fcf05e75da037170';

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionCfg
});

const messages = [
    "Pastillaa",
    "Pasti",
    "Pastillaaaa",
    "Pasti bebe",
    "Pastillarda",
    "La Pastilla Tenes Que Tomar",
    "Debes tomar la pastilla chiarabelencamanolauritsen",
    "Pastilia (Pastilla)",
    "Pastillllllaaaaaaaa",
    "pastilla Nro 12314131345344632"
];

function setupAutoMessage() {
    const number = '541138120741'; 
    const time = '16:30';  

    const [hour, minute] = time.split(':');
    schedule.scheduleJob({ hour: parseInt(hour), minute: parseInt(minute) }, function() {
        const message = messages[Math.floor(Math.random() * messages.length)];
        client.sendMessage(`${number}@c.us`, message);
    });
}

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente listo!');
    setupAutoMessage();
});

client.on('authenticated', (session) => {
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', async message => {
    if (message.body.toLowerCase() === '!clima') {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,ar&units=metric&appid=${OPEN_WEATHER_API_KEY}`);
            const weather = response.data;
            const description = weather.weather[0].description;
            const temperature = weather.main.temp;
            const msg = `El clima actual en Buenos Aires es: ${description}. Temperatura: ${temperature}°C.`;
            message.reply(msg);
        } catch (err) {
            console.error('Error al obtener el clima:', err);
            message.reply('Lo siento, no pude obtener el clima en este momento.');
        }
    }
});

client.initialize();

