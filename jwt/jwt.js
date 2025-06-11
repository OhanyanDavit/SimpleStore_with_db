const jwt = require('jsonwebtoken');
const secretKey = "shhh";
const jwtOptions = {
  expiresIn: '1h',
  algorithm: 'HS256'
};
function generateToken(user) {
  const payload = {
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, secretKey, jwtOptions);
}
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};