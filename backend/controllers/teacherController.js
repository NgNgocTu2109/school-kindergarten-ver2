import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createTeacher = async (req, res, next) => {
  const { fullName, email, subject } = req.body;

  try {
    if (!fullName || !email || !subject) {
      return handleValidationError("Vui lòng điền đầy đủ thông tin!", 400);
    }

    await Teacher.create({ fullName, email, subject });

    res.status(200).json({
      success: true,
      message: "Thêm giáo viên thành công!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find(); // hoặc không truyền gì
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Không tìm thấy giáo viên!" });
    }
    res.status(200).json({ success: true, message: "Đã xóa giáo viên!" });
  } catch (err) {
    next(err);
  }
};

export const updateTeacher = async (req, res, next) => {
  const { fullName, email, subject } = req.body;
  try {
    const updated = await Teacher.findByIdAndUpdate(
      req.params.id,
      { fullName, email, subject },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Không tìm thấy giáo viên!" });
    }
    res.status(200).json({ success: true, teacher: updated });
  } catch (err) {
    next(err);
  }
};

