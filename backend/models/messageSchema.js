// ✅ File: models/messageSchema.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      from: {
        type: String,
        enum: ["teacher", "student"],
        required: true,
      },
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Message = mongoose.model("Message", messageSchema);
