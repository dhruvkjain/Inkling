const express = require('express');
const path = require('path');
const { signup, login, logout } = require(path.join(__dirname , 'controllers', 'auth.controllers.js'));

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

module.exports = { authRouter };