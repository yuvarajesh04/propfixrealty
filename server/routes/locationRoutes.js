const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
    addLocation,
    getLocations
} = require('../controllers/locationController')

router.post('/new', auth, addLocation);
router.get('/get-locations', getLocations);

module.exports = router