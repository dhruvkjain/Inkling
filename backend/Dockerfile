FROM node:20-alpine

WORKDIR /usr/src/inkling

COPY package* .

RUN npm install

COPY . .

WORKDIR /usr/src/inkling/src

EXPOSE 3000

CMD ["node", "server.js"]

