const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const schedule = require('node-schedule');
    ``
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

    rl.question(`Trigger message #${counter}: `, (trigger) => {
        rl.question(`Response for "${trigger}": `, (response) => {
            responses[trigger.toLowerCase()] = response;
            askForMessages(counter - 1);
        });
    });
}

function setupAutoMessage() {
    rl.question('Which number would you like to send the message to? (Format example: [country code without +][number] -> 154187564534) ', (number) => {
        rl.question('What message do you wish to send automatically? ', (message) => {
            rl.question('At what time do you wish to send the message? (Format: HH:MM) ', (time) => {
                const [hour, minute] = time.split(':');
                schedule.scheduleJob({ hour: parseInt(hour), minute: parseInt(minute) }, function() {
                    client.sendMessage(`${number}@c.us`, message);
                    console.log(`Message sent to ${number} at ${hour}:${minute}.`);
                });
                console.log(`"${message}" will be sent to ${number} every day at ${hour}:${minute}.`);
                rl.close();
                client.initialize();
            });
        });
    });
}

rl.question('What would you like to do?\n1. Send a message automatically every day at a specific time.\n2. Set up automatic replies based on keywords or phrases.\nChoose 1 or 2: ', (choice) => {
    switch(choice) {
        case '1':
            setupAutoMessage();
            break;
        case '2':
            rl.question('How many messages do you want to define? ', (num) => {
                const count = parseInt(num);
                if (!isNaN(count)) {
                    askForMessages(count);
                } else {
                    console.log("Please enter a valid number.");
                    rl.close();
                }
            });
            break;
        default:
            console.log("Invalid option.");
            rl.close();
            break;
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client ready!');
});

client.on('message', message => {
    for (let trigger in responses) {
        if (message.body.toLowerCase().includes(trigger)) {
            message.reply(responses[trigger]);
        }
    }
});

