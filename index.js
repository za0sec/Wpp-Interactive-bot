const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const schedule = require('node-schedule');

const client = new Client();

let responses = {};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    rl.question('¿A qué número deseas enviar el mensaje? (Formato: [Código de País][Número sin 0 ni 15]) ', (number) => {
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

rl.question('¿Qué deseas hacer?\n1. Enviar un mensaje automáticamente todos los días a una hora específica.\n2. Configurar respuestas automáticas basadas en palabras o frases.\nElige 1 o 2: ', (choice) => {
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
    console.log('Client is ready!');
});

client.on('message', message => {
    for (let trigger in responses) {
        if (message.body.toLowerCase().includes(trigger)) {
            message.reply(responses[trigger]);
        }
    }
});
