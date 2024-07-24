const jwt = require('jsonwebtoken');

function generateTokenAndSetCookie(userid, res) {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 1000, // == 1 hour always in MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV === "production"
  });
}
  
module.exports = {
  generateTokenAndSetCookie,
};