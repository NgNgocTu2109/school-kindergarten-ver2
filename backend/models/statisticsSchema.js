import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  className: {
    type: String,
    required: false, // trước là true
    trim: true,
  },
  studentCount: {
    type: Number,
    required: false, // trước là true
  },
  month: {
    type: String,
    required: false,
  },
  attendanceRate: {
    type: Number,
    required: false,
  },
  absentRate: {
    type: Number,
    required: false,
  },
  healthStatus: [{
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  }]
}, { timestamps: true }); // Cho phép sort theo createdAt

export const Statistics = mongoose.model("Statistics", statisticsSchema);
