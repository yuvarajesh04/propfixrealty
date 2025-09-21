const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
    addLocation
} = require('../controllers/locationController')

router.post('/new', auth, addLocation)

module.exports = router