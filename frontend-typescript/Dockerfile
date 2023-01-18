# Base image
FROM node:18 

ARG deploy

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]


