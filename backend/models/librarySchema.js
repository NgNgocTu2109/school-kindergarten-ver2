import mongoose from "mongoose";
import validator from "validator";

const librarySchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  // ✅ Ghi nhận lịch sử mượn sách
  borrowRecords: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child", 
        required: true,
      },
      borrowDate: {
        type: Date,
        default: Date.now,
      },
      returnDate: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["Đang mượn", "Đã trả"],
        default: "Đang mượn",
      },
    },
  ],
});

export const Book = mongoose.model("Library", librarySchema);
