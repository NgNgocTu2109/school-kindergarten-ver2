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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Event = mongoose.model("Event", eventSchema);
