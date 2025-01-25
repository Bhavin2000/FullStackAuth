const express = require('express');
const router = express.Router();
const { register, login,  verifyData} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Public Routes
router.post('/register', register);
router.post('/login', login);
router.post("/verify-token",verifyData );

module.exports = router;
