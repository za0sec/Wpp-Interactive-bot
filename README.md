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

3. Install the dependencies:
```bash
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

4. Install using makefile:
```bash
make install
```

5. Make the run.sh script executable:
```bash
chmod +x run.sh
```
6. Execute the bot using the script:
```bash
./run.sh
```

## Contributions

All contributions are welcome. If you have improvements or corrections, feel free to make a pull request!

## Acknowledgements

A special thanks to [whatsapp-web.js](https://wwebjs.dev/) for providing the foundation and inspiration for this project.

## License

[MIT](https://github.com/za0sec/)
