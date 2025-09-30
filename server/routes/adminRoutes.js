import express from "express";
import auth from "../middleware/authMiddleware.js";
import adminController from "../controllers/adminController.js"; // Use named exports

const router = express.Router();

// Routes
router.post("/login", adminController.loginAdmin);
router.post("/register", adminController.registerAdmin);
router.get("/get-all-clients", auth, adminController.getAllClients);

export default router;
