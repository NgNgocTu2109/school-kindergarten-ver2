import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Có mặt", "Vắng", "Có phép"],
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  eat: {
    type: String,
    enum: ["Ăn hết", "Ăn ít", "Không ăn", ""],
    default: "",
  },
  sleep: {
    type: String,
    enum: ["Ngủ ngon", "Ngủ ít", "Không ngủ", ""],
    default: "",
  },
  // ✅ Thêm trường ảnh minh chứng
  imageUrl: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

// Mỗi học sinh chỉ có 1 điểm danh/ngày/lớp
attendanceSchema.index({ childId: 1, classId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
