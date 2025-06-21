import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },

  // 👇 Thêm mới: Trạng thái làm việc
  status: {
    type: String,
    enum: ["Đang làm việc", "Đã thôi việc"],
    default: "Đang làm việc"
  },

  // 👇 Thêm mới: Ngày bắt đầu làm việc
  startDate: {
    type: Date,
    required: true
  },

  // 👇 Thêm mới: Ngày kết thúc làm việc (nếu đã nghỉ)
  endDate: {
    type: Date,
    default: null
  },

  // 👇 Thêm mới: Ảnh đại diện giáo viên
  avatar: {
    type: String,
    default: ""
  }
});

export const Teacher = mongoose.model('Teacher', teacherSchema);
