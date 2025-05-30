import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ Thêm createdAt, updatedAt
  }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
