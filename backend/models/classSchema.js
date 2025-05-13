import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
  attendanceRate: {
    type: Number,
    default: 0,
  },
  absentRate: {
    type: Number,
    default: 0,
  },
  healthData: [
    {
      name: String,
      healthStatus: String,
    },
  ],
});

export const Class = mongoose.model("Classes", classSchema);
