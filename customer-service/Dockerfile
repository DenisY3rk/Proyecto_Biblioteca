FROM mhart/alpine-node:latest

WORKDIR /usr/src/app

#Instalando las dependencias
COPY package*.json ./

RUN npm install --production

# Copiando todos los archivos
COPY index.js fake-db.js ./

EXPOSE 3000

CMD [ "npm", "run", "start" ]