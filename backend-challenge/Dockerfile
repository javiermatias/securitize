# Base image
FROM node:18 

ARG deploy

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

RUN cp .env ./dist 

CMD ["node", "./dist/main.js"]

