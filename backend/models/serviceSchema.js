import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên dịch vụ"]
  },
  price: {
    type: Number,
    required: [true, "Vui lòng nhập giá tiền"]
  },
  type: {
    type: String,
    enum: ["Buổi", "Tháng"],
    required: [true, "Vui lòng chọn loại dịch vụ"]
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String // ✅ Link video mô tả (nếu có)
  },
  sessionCount: {
    type: Number // ✅ Số buổi học (nếu áp dụng)
  },
  sessionDuration: {
    type: String // ✅ Thời lượng mỗi buổi (ví dụ: "45 phút")
  },
  fromTime: {
    type: String // ✅ Thời gian bắt đầu buổi học (ví dụ: "08:00")
  },
  toTime: {
    type: String // ✅ Thời gian kết thúc buổi học (ví dụ: "09:30")
  },
  image: {
    type: String
  },
  usageRecords: [
    {
      childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      image: String,
      note: String,
      sessionCount: Number, 
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ]
}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);
