const express = require("express");
const router = express.Router();
const uploads = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Create
router.post("/create-project", auth, uploads.array("images"), createProject);

// Get all
router.get("/get-all", getAllProjects);

// Get single
router.get("/get/:id", getSingleProject);

// Update
router.put("/update/:id", auth, uploads.array("images"), updateProject);

// Delete
router.delete("/delete/:id", auth, deleteProject);

module.exports = router;
