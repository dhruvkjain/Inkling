const express = require("express");
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());
// TODO : change logs file name before production.
var accessLogStream = fs.createWriteStream(path.join(__dirname, '..' , 'devlogs.txt'), { flags: 'a' })
app.use(morgan('combined' , { stream: accessLogStream }));

const { authRouter } = require(path.join(__dirname, 'routes', 'auth.routes.js'));

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('done');
});

module.exports = { app }