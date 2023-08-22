console.log("Inicio del script");

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
const fs = require('fs');
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;

const GOOGLE_CLOUD_PROJECT_ID = '<Id del proyecto>';
const GOOGLE_CLOUD_API_KEY = '<API GOOGLE>';

const translate = new Translate({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    key: GOOGLE_CLOUD_API_KEY
});

const OPEN_WEATHER_API_KEY = '<API WEATHER>';

const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/chromium'
    },
    authStrategy: new LocalAuth()
});

const messages = [
  //mensajes
];


function setupAutoMessage() {
    const number = '<numero>';
    const time = '16:30';

    const [hour, minute] = time.split(':');
    schedule.scheduleJob({ hour: parseInt(hour), minute: parseInt(minute) }, function() {
        const message = messages[Math.floor(Math.random() * messages.length)];
        client.sendMessage(`${number}@c.us`, message);
    });
}

client.on('qr', qr => {
    console.log("Generando QR");
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente listo!');
    setupAutoMessage();
});

const allowedGroupIds = ['120363044044352552@g.us', '5491167883716-1616629666@g.us', '5491131912906-1378119655@g.us', '5491136866326-1635250746@g.us', '120363160477681516@g.us'];


client.on('message', async message => {
    console.log("Mensaje recibido de:", message.from);

    if (message.from.endsWith('@g.us') && !allowedGroupIds.includes(message.from)) {
        console.log('Mensaje desde un grupo no permitido:', message.from);
        return;
    }

    const messageContent = message.body.toLowerCase();

    if (messageContent === '!clima') {
        console.log("Comando !clima llamado");
        try {
            console.log("Llamando a la API del clima");
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
    } else if (messageContent.startsWith('traduce:')) {
        console.log("Comando traduce: llamado");
        const textToTranslate = message.body.split(':').slice(1).join(':').trim();
        try {
            const [translation] = await translate.translate(textToTranslate, 'es');
            message.reply(translation);
        } catch (err) {
            console.error('Error al traducir:', err);
            message.reply('Lo siento, no pude traducir ese texto.');
        }
    } else if (messageContent === '!github') {
        console.log("Comando !github llamado");
        message.reply('https://github.com/za0sec');
    }
   
});

console.log("Antes de inicializar el cliente");
client.initialize();
console.log("Después de intentar inicializar el cliente");


