const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register-client', userController.registerClient);

module.exports = router;

