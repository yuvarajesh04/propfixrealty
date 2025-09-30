import express from "express";
import uploads from "../middleware/uploadMiddleware.js";
import auth from "../middleware/authMiddleware.js";
import projectController from "../controllers/projectController.js";

const router = express.Router();

// ===== Create Project =====
router.post(
  "/create-project",
  auth,
  uploads.array("images"),
  projectController.createProject
);

// ===== Get All Projects =====
router.get("/get-all", projectController.getAllProjects);

// ===== Get Single Project =====
router.get("/get/:id", projectController.getSingleProject);

// ===== Update Project =====
router.put(
  "/update/:id",
  auth,
  uploads.array("images"),
  projectController.updateProject
);

// ===== Delete Project =====
router.delete("/delete/:id", auth, projectController.deleteProject);

export default router;
