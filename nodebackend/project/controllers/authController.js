// controllers/authController.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/Config');  // Loading the secret key
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data', 'users.json');

// Helper function to read users from the file
function readUsersFromFile() {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

// Register User
const register = (req, res) => {
  const { username, password, repeatPassword, email } = req.body;

  if (!username || !password || !repeatPassword || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  const users = readUsersFromFile();
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists." });
  }

  // Add the new user to the array
  users.push({ username, password, email });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully." });
};

// Login User
const login = (req, res) => {
  const { username, password } = req.body;

  const users = readUsersFromFile();
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Create token payload
  const tokenPayload = { username: user.username, email: user.email };

  // Create a JWT token (expires in 1 hour)
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '2m' });

  res.json({
    message: "Login successful.",
    token,
    username: user.username,
  });
};

// Protected Route (for demonstration)
const verifyData = (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token is invalid or expired." });
    }

    // If token is valid, send decoded user info or a success message
    res.json({ message: "Token is valid", user: decoded });
  });
};

module.exports = {
  register,
  login,
  verifyData,
};
