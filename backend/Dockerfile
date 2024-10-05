FROM node:20

WORKDIR /usr/src/inkling

COPY . .

RUN npm install

WORKDIR /usr/src/inkling/src

EXPOSE 3000

CMD ["node", "server.js"]

