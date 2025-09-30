import Project from "../models/projectModel.js";
import connectDB from "../config/db.js";

// Cached DB connection for serverless
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected (cached)");
  }
}

const projectController = {
  createProject: async (req, res) => {
    try {
      await connectOnce(); // ensure DB connected

      const {
        title,
        des,
        location,
        size,
        builder,
        totalland,
        price,
        type,
        status,
        nearby,
        amenities,
      } = req.body;

      // Save relative paths for images
      const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

      const isExist = await Project.findOne({ title });
      if (isExist) {
        return res.status(400).json({
          success: false,
          message: "Project already exists",
        });
      }

      const project = new Project({
        title,
        des,
        location,
        size,
        builder,
        totalland,
        price,
        type,
        status,
        nearby: nearby ? JSON.parse(nearby) : [],
        amenities: amenities ? JSON.parse(amenities) : [],
        images,
      });

      await project.save();

      res.status(201).json({
        success: true,
        message: "Project created successfully!",
        project,
      });
    } catch (error) {
      console.error("Project creating error:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      await connectOnce(); // ensure DB connected

      const projects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        message: "Projects retrieved successfully",
        projects,
      });
    } catch (error) {
      console.error("Get all projects error:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getSingleProject: async (req, res) => {
    try {
      await connectOnce();
      const { id } = req.params;

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }

      res.status(200).json({ success: true, project });
    } catch (error) {
      console.error("Get single project error:", error.message);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  updateProject: async (req, res) => {
    try {
      await connectOnce();
      const { id } = req.params;

      const {
        title,
        des,
        location,
        size,
        builder,
        totalland,
        price,
        type,
        status,
        nearby,
        amenities,
        existingImages,
      } = req.body;

      let parsedExistingImages = [];
      try {
        parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];
      } catch (e) {
        parsedExistingImages = [];
      }

      const newImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }

      project.title = title || project.title;
      project.des = des || project.des;
      project.location = location || project.location;
      project.size = size || project.size;
      project.builder = builder || project.builder;
      project.totalland = totalland || project.totalland;
      project.price = price || project.price;
      project.type = type || project.type;
      project.status = status || project.status;
      project.nearby = nearby ? JSON.parse(nearby) : project.nearby;
      project.amenities = amenities ? JSON.parse(amenities) : project.amenities;
      project.images = [...parsedExistingImages, ...newImages];

      await project.save();

      res.status(200).json({ success: true, message: "Project updated successfully", project });
    } catch (error) {
      console.error("Update project error:", error.message);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      await connectOnce();

      const { id } = req.params;

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found", success: false });
      }

      await Project.findByIdAndDelete(id);

      res.status(200).json({ message: "Project deleted successfully", success: true });
    } catch (error) {
      console.error("Delete project error:", error.message);
      res.status(500).json({ message: "Server error", success: false });
    }
  }
};

export default projectController;
