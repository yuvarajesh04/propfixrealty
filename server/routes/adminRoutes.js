const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')

const adminController = require('../controllers/adminController');

// Route for admin login
router.post('/login', adminController.loginAdmin);
router.post('/register', adminController.registerAdmin);
router.get('/get-all-clients', auth, adminController.getAllClients);

module.exports = router;