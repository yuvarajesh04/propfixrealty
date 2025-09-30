import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config();

// ===== recreate __dirname =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();

  app.use(
    cors({
      origin: ["https://propfixrealty.com", "https://www.propfixrealty.com"],
    })
  );
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use("/api/auth", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/location", locationRoutes);

  // Static uploads
  app.use("/uploads", express.static(join(__dirname, "uploads")));

  // Database
  await connectDB();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

createServer();
