import mongoose from "mongoose";

const tuitionSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
    unique: true,
  },
  monthlyFee: {
    type: Number,
    required: true,
  },
  mealFeePerDay: {
    type: Number,
    required: true,
  },
});

export const Tuition = mongoose.model("Tuition", tuitionSchema);
