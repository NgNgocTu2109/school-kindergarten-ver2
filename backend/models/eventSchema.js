import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["sukien", "hoatdong"],
    required: true,
  },
  classIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },
  ],
  image: {
    type: String,
  },
  fee: {
    type: Number,
    default: 0, // 0 đồng nghĩa là miễn phí
  },
  detailLink: {
    type: String,
    default: "",
  },
  pickupTime: {
    type: String,
    default: "",
  },
  pickupLocation: {
    type: String,
    default: "",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventHistory: [
    {
      childId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child",
      },
      status: {
        type: String,
        enum: ["registered", "cancelled"],
      },
      source: {
        type: String,
        enum: ["student", "admin"],
      },
      date: Date,
    },
  ],
});

export const Event = mongoose.model("Event", eventSchema);
