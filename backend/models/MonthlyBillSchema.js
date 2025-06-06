import mongoose from "mongoose";

const monthlyBillSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true,
  },
  month: {
    type: String, // "2025-05"
    required: true,
  },
  classFee: Number,
  serviceFees: Number,
  mealFees: Number,
  eventFees: Number, // ✅ Thêm tổng tiền sự kiện
  total: Number,
  isPaid: {
    type: Boolean,
    default: false,
  },
  details: {
    attendedDays: Number,
    mealFeePerDay: Number,
    services: [
      {
        serviceName: String,
        price: Number,
        sessionCount: Number,
      },
    ],
    events: [ // ✅ Thêm chi tiết sự kiện
      {
        eventName: String,
        fee: Number,
      },
    ],
  },
}, { timestamps: true });

export const MonthlyBill = mongoose.model("MonthlyBill", monthlyBillSchema);
