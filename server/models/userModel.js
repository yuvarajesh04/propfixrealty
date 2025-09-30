// server/models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
