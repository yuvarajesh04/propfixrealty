// server/routes/userRoutes.js
import express from 'express';
import { registerClient } from '../controllers/userController.js';

const router = express.Router();

// Route for client registration
router.post('/register-client', registerClient);

export default router;
