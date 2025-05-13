// ✅ Sửa hoàn chỉnh serviceSchema.js để thêm image và description

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
  image: {
    type: String // tên file ảnh (đường dẫn tương đối)
  }
}, { timestamps: true });

export const Service = mongoose.model("Service", serviceSchema);
