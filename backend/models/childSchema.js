import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ"],
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: false, // Có thể thêm sau
  },
}, {
  timestamps: true
});

export const Child = mongoose.model("Child", childSchema);
