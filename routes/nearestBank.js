const express = require('express');
const router = express.Router();
const nearestBankHandler = require('./handlers/nearestBankHandler');

router.get('/', nearestBankHandler.getNearestBank);

module.exports = router;