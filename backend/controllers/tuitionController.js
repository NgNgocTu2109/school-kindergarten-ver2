import { Tuition } from "../models/TuitionSchema.js";

export const setTuition = async (req, res) => {
  try {
    const { classId, monthlyFee, mealFeePerDay } = req.body;
    if (!classId || !monthlyFee || !mealFeePerDay) {
      return res.status(400).json({ message: "Thiếu thông tin học phí" });
    }

    const tuition = await Tuition.findOneAndUpdate(
      { classId },
      { monthlyFee, mealFeePerDay },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, tuition });
  } catch (err) {
    console.error("Lỗi tạo/sửa học phí:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

export const getTuitionByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    const tuition = await Tuition.findOne({ classId });
    if (!tuition) return res.status(404).json({ message: "Không tìm thấy học phí lớp này" });
    res.status(200).json({ success: true, tuition });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy học phí lớp", error: err.message });
  }
};

export const getAllTuitions = async (req, res) => {
  try {
    const tuitions = await Tuition.find().populate("classId", "grade");
    res.status(200).json({ success: true, tuitions });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách học phí" });
  }
};
