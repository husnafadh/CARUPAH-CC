const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/authHandler');

// Registration endpoint
router.post('/register', (req, res) => {
    authHandler.register(req, res);
});

// Login endpoint
router.post('/login', (req, res) => {
    authHandler.login(req, res);
});

// Google OAuth sign-in endpoint
router.post('/google-signin', (req, res) => {
    authHandler.googleSignIn(req, res);
});

module.exports = router;
