// locationRoutes.js
import locationController from '../controllers/locationController.js';
import express from 'express';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/new', auth, locationController.addLocation);
router.get('/get-locations', locationController.getLocations);
router.put('/:id', auth, locationController.editLocation);
router.delete('/:id', auth, locationController.deleteLocation);

export default router;
