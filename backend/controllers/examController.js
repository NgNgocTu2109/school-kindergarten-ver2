import { Exams } from "../models/examSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const addExam = async (req, res, next) => {
  console.log(req.body);
  const { name, registrationNumber, className, marks } = req.body;
  try {
   if (!name || !registrationNumber || !className || !marks ) {
    handleValidationError("Please Fill all the fields!", 400);
  }
  await Exams.create({ name, registrationNumber, className, marks });
  res.status(200).json({
    success: true,
    message: "A new exam has been created!",
  });   
} catch (err) {
  next(err);
} 
};

export const getAllExams = async (req, res, next) => {
  try {
   const exams = await Exams.find();
  res.status(200).json({
    success: true,
    exams,
  });   
} catch (err) {
  next(err);
}
};