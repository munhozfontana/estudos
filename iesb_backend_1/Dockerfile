FROM node:latest

WORKDIR /usr/apps

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN nodemon