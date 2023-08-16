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

# Comprueba si node_modules existe y, si no, instala dependencias
if [ ! -d "node_modules" ]; then
    echo -e "\n${yellowColour}[*] Instalando dependencias...${endColour}\n"
    npm install
fi

# Ejecuta el programa
node index.js

