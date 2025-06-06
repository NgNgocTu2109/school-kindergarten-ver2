import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  breakfast: {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  lunch: {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }
  }
}, { timestamps: true });

// ✅ Mỗi classId chỉ có 1 thực đơn/ngày
menuSchema.index({ classId: 1, date: 1 }, { unique: true });

export const Menu = mongoose.model("Menu", menuSchema);
