#!/bin/bash

#Colours
greenColour="\e[0;32m\033[1m"
endColour="\033[0m\e[0m"
redColour="\e[0;31m\033[1m"
blueColour="\e[0;34m\033[1m"
yellowColour="\e[0;33m\033[1m"
purpleColour="\e[0;35m\033[1m"
turquoiseColour="\e[0;36m\033[1m"
grayColour="\e[0;37m\033[1m"

# Check if node_modules exists and, if not, install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "\n${yellowColour}[*] Installing dependencies...${endColour}\n"
    npm install
fi

# Prompt for language selection
echo -e "${blueColour}Choose your language / Elige tu idioma:\n${endColour}"
echo -e "${greenColour}1. English${endColour}"
echo -e "${greenColour}2. Español${endColour}"
read choice

case $choice in
    1)
    node index_en.js
    ;;

    2)
    node index_es.js
    ;;

    *)
    echo -e "${redColour}Invalid choice / Opción no válida${endColour}"
    ;;
esac

