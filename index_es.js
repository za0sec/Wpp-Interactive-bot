const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const schedule = require('node-schedule');
const axios = require('axios');

const client = new Client({
	puppeteer: {
      executablePath: '/usr/bin/chromium'
   	},
    authStrategy: new LocalAuth()
});


let responses = {};

const OPENWEATHER_API_KEY = 'b99ec1349de4aa78fcf05e75da037170';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getWeather(city) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`);
    const { weather, main } = response.data;
    return `El clima en ${city} es ${weather[0].description} con una temperatura de ${main.temp}°C.`;
}

function askForMessages(counter) {
    if (counter === 0) {
        rl.close();
        client.initialize();
        return;
    }

    rl.question(`Mensaje de disparo #${counter}: `, (trigger) => {
        rl.question(`Respuesta para "${trigger}": `, (response) => {
            responses[trigger.toLowerCase()] = response;
            askForMessages(counter - 1);
        });
    });
}

function setupAutoMessage() {
    rl.question('¿A qué número deseas enviar el mensaje? (Formato: [Cod. Pais (sin simbolo +)][Número] -> 541112345678) ', (number) => {
        rl.question('¿Qué mensaje deseas enviar automáticamente? ', (message) => {
            rl.question('¿A qué hora deseas enviar el mensaje? (Formato: HH:MM) ', (time) => {
                const [hour, minute] = time.split(':');
                schedule.scheduleJob({ hour: parseInt(hour), minute: parseInt(minute) }, function() {
                    client.sendMessage(`${number}@c.us`, message);
                    console.log(`Mensaje enviado a ${number} a las ${hour}:${minute}.`);
                });
                console.log(`Se enviará "${message}" a ${number} todos los días a las ${hour}:${minute}.`);
                rl.close();
                client.initialize();
            });
        });
    });
}

rl.question('¿Qué deseas hacer?\n1. Enviar un mensaje automáticamente todos los días a una hora específica.\n2. Configurar respuestas automáticas basadas en palabras o frases.\n3. Configurar alerta climática (!clima)\nElige 1, 2 o 3: ', (choice) => {
    switch(choice) {
        case '1':
            setupAutoMessage();
            break;
        case '2':
            rl.question('¿Cuántos mensajes deseas definir? ', (num) => {
                const count = parseInt(num);
                if (!isNaN(count)) {
                    askForMessages(count);
                } else {
                    console.log("Por favor, ingrese un número válido.");
                    rl.close();
                }
            });
            break;
        case '3':
            responses["!clima"] = async () => {
                const city = "Buenos Aires";  // Puedes hacer esto dinámico también
                return await getWeather(city);
            };
            rl.close();
            client.initialize();
            break;
        default:
            console.log("Opción no válida.");
            rl.close();
            break;
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente listo!');
});

client.on('message', async message => {
    for (let trigger in responses) {
        if (message.body.toLowerCase().includes(trigger)) {
            if (typeof responses[trigger] === "function") {
                const response = await responses[trigger]();
                message.reply(response);
            } else {
                message.reply(responses[trigger]);
            }
        }
    }
});

