FROM node:10-alpine

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start_dev" ]
