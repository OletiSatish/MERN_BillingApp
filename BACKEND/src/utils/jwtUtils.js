const jwt = require('jsonwebtoken');

// Function to verify JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err); // Reject the promise if token is invalid
      } else {
        resolve(decoded); // Resolve the promise with decoded token data
      }
    });
  });
};

module.exports = { verifyToken };
