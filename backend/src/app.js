const express = require("express");
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin:'https://inkling-sigma.vercel.app',
  credentials: true, // enable credentials
}));
app.use(express.json());
app.use(cookieParser());
// TODO : change logs file name before production.
var accessLogStream = fs.createWriteStream('./prodlogs.txt', { flags: 'a' })
app.use(morgan('combined' , { stream: accessLogStream }));

const { authRouter } = require('./routes/auth.routes.js');

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('done');
});

module.exports = { app }