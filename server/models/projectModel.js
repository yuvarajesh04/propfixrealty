const mongoose = require("mongoose");

// For nearby facilities
const nearbySchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  distance: { type: String, required: true },
});

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String }, // ✅ matches payload key
    location: { type: String, required: true },
    size: { type: String, required: true },
    builder: { type: String, required: true },
    totalland: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, enum: ["villa", "apartment", "plot"], required: true },
    status: {
      type: String,
      enum: ["ready to move", "under construction", "up comming"],
      required: true,
    },
    nearby: [nearbySchema], // ✅ array of objects
    amenities: [{ type: String }], // ✅ array of strings
    images: [{ type: String }], // ✅ array of uploaded file paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
