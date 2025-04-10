import mongoose from "mongoose";

const extracurricularActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: false
  }
}, { timestamps: true });

export const ExtracurricularActivity = mongoose.model("ExtracurricularActivity", extracurricularActivitySchema);
