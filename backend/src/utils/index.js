const path = require('path')
const jwtUtils =require(path.join(__dirname, 'jwt.js'));
const hashUtils = require(path.join(__dirname, 'hash.js'));

module.exports = {
  ...jwtUtils,
  ...hashUtils,
};