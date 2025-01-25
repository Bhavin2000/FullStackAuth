const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/Config');

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // If token is valid, attach the user to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware/route
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token has expired, please log in again." });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = verifyToken;
