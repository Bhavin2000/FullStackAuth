require('dotenv').config(); // Loads environment variables from .env

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000,
};
