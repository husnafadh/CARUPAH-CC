const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/authHandler');

// Registration endpoint
router.post('/register', authHandler.register);

// Login endpoint
router.post('/login', authHandler.login);

// Google OAuth sign-in endpoint
router.post('/google-signin', authHandler.googleSignIn);

module.exports = router;
