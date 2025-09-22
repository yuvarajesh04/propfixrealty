const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
    addLocation,
    getLocations,
    editLocation,
    deleteLocation
} = require('../controllers/locationController')

router.post('/new', auth, addLocation);
router.get('/get-locations', getLocations);
router.put('/:id', auth, editLocation);
router.delete('/:id', auth, deleteLocation);

module.exports = router