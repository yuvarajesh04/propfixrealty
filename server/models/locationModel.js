import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
