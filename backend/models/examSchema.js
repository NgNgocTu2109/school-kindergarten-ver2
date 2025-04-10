import mongoose from "mongoose";
import validator from "validator";

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  className: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
});


export const Exams = mongoose.model('Exams', examSchema);