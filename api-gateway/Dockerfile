FROM mhart/alpine-node:latest

WORKDIR /usr/src/app

#Instalando las dependencias
COPY package*.json ./

RUN npm install --production

# Copiando todos los archivos
COPY index.js ./

# Copiando los recursos del frontend
COPY public ./public

EXPOSE 3003

CMD [ "npm", "run", "start" ]