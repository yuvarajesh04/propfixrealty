import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/propfixrealty"
    );
    console.log("✅ MongoDB connected with localdb");
  } catch (error) {
    console.log("Mongo DB connection error:", error.message);
  }
}

export default connectDB;
