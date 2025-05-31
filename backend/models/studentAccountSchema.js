// models/studentAccountSchema.js
import mongoose from "mongoose";

const studentAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // đảm bảo không trùng email
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child", // liên kết tới học sinh
    required: true,
  },
}, {
  timestamps: true, // thêm thời gian tạo/cập nhật
});

export const StudentAccount = mongoose.model("StudentAccount", studentAccountSchema);
