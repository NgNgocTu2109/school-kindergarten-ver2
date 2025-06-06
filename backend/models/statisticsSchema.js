import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  healthStatus: [
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true });

export const Statistics = mongoose.model("Statistics", statisticsSchema);
