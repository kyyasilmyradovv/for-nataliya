const express = require('express');
const { updateUserBalance } = require('./../controllers/userControllers');
const router = express.Router();

// Router: users
router.post('/update-balance', updateUserBalance);

module.exports = router;
