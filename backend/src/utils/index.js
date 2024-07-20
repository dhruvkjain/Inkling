const { generateTokenAndSetCookie } = require('./jwt.js');
const { hashPassword, comparePassword} = require('./hash.js');

module.exports = {
  generateTokenAndSetCookie,
  hashPassword,
  comparePassword,
};