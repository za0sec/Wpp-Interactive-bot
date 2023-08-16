# Wpp-Interactive-bot

This project is an advanced and enhanced implementation based on [whatsapp-web.js](https://wwebjs.dev/), a high-level library that allows interaction with WhatsApp Web.

## Description

`Wpp-Interactive-bot` takes the capabilities of the original library a step further, offering additional and improved functionalities for automation and message handling in WhatsApp Web.

## Features

- **Auto-response:** Set up automatic responses based on keywords or specific phrases.
- **Scheduled Messaging:** Ability to send out automated messages at specific times of the day.
- **Multilanguage Support:** Choose between English and Spanish for bot prompts and interactions.
- **Keyword-triggered Replies:** Automatically respond to received messages that contain certain keywords or phrases.
- **QR Code Support:** Visually displays the QR code for easier WhatsApp Web login.
- **Interactive Configuration:** Prompt-based setup allowing users to define auto-response triggers and replies.
- **Message Limiting:** Set a limit to the number of automated replies within a given time frame.
- **Multilingual Support:** Respond in different languages based on user preference or message content.
- **Auto-reconnection:** Automatically attempts to reconnect in case of disconnections from WhatsApp Web.
- **Message Logging:** Logs all received and sent messages for review or debugging purposes.
- **Dynamic Script Execution:** Utilize .sh scripts for easy startup and dependency management.

## Installation and Execution

1. Clone this repository:
```bash
git clone https://github.com/za0sec/Wpp-Interactive-bot
```

2. Navigate to the project directory
```bash
cd Wpp-Interactive-bot
```

3. Install the dependencies using the Makefile:
```bash
make install
```

4. Make the run.sh script executable:
```bash
chmod +x run.sh
```
5. Execute the bot using the script:
```bash
./run.sh
```

## Contributions

All contributions are welcome. If you have improvements or corrections, feel free to make a pull request!

## Acknowledgements

A special thanks to [whatsapp-web.js](https://wwebjs.dev/) for providing the foundation and inspiration for this project.

## License

[MIT](https://github.com/za0sec/)
