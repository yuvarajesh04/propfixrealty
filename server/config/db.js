import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://yuvarajesh:Yuva.V%4004@cluster0.vitdzng.mongodb.net/propfixrealty?retryWrites=true&w=majority&appName=Cluster0"
    )

      .then(() => console.log('Mongoo db connected with propfixrealty database'))
  } catch (error) {
    console.log("Mongo DB connection error:", error.message)
  }
}

export default connectDB;
