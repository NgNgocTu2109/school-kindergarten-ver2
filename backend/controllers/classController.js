import { Class } from "../models/classSchema.js";
import { Tuition } from "../models/TuitionSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createClass = async (req, res, next) => {
  const { grade, ageGroup, teacherId } = req.body;

  try {
    if (!grade || !ageGroup || !teacherId) {
      return handleValidationError("Vui lòng nhập đầy đủ thông tin lớp học!", 400);
    }

    const newClass = await Class.create({ grade, ageGroup, teacherId });

    res.status(200).json({
      success: true,
      message: "Tạo lớp thành công!",
      class: newClass, // ✅ thêm dòng này để React lấy được _id
    });
  } catch (err) {
    next(err);
  }
};


export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("teacherId", "fullName");

    const tuitions = await Tuition.find(); // lấy tất cả học phí
    const tuitionMap = {};
    tuitions.forEach(t => {
      if (t.classId) {
        tuitionMap[t.classId.toString()] = {
          monthlyFee: t.monthlyFee,
          mealFeePerDay: t.mealFeePerDay,
        };
      }
    });

    const merged = classes.map(cls => ({
      ...cls.toObject(),
      tuition: tuitionMap[cls._id.toString()] || null,
    }));

    res.status(200).json({ success: true, classes: merged });
  } catch (err) {
    console.error("Lỗi getAllClasses:", err);
    res.status(500).json({ success: false, message: "Lỗi lấy danh sách lớp", error: err.message });
  }
};

export const deleteClass = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy lớp!" });
    }
    res.status(200).json({ success: true, message: "Đã xoá lớp!" });
  } catch (err) {
    next(err);
  }
};

export const updateClassStatistics = async (req, res, next) => {
  const { id } = req.params;
  const { studentCount, attendanceRate, absentRate, healthData } = req.body;

  try {
    const updated = await Class.findByIdAndUpdate(id, {
      studentCount,
      attendanceRate,
      absentRate,
      healthData,
    }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Không tìm thấy lớp!" });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật thống kê thành công!",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};
