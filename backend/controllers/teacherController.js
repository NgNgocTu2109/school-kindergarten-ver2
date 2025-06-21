import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// 👉 Tạo giáo viên mới
export const createTeacher = async (req, res, next) => {
  const { fullName, email, subject } = req.body;

  try {
    if (!fullName || !email || !subject) {
      return handleValidationError("Vui lòng điền đầy đủ thông tin!", 400);
    }

    const { status = "Đang làm việc", startDate, endDate = null } = req.body;

    if (status === "Đã thôi việc" && !endDate) {
      return handleValidationError("Vui lòng nhập ngày kết thúc nếu giáo viên đã thôi việc!", 400);
    }

    if (!startDate) {
      return handleValidationError("Vui lòng nhập ngày bắt đầu làm việc!", 400);
    }

    const avatar = req.file ? `/uploads/${req.file.filename}` : "";

    await Teacher.create({
      fullName,
      email,
      subject,
      status,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      avatar
    });

    res.status(200).json({
      success: true,
      message: "Thêm giáo viên thành công!",
    });
  } catch (err) {
    next(err);
  }
};

// 👉 Lấy toàn bộ danh sách giáo viên
export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

// 👉 Xóa giáo viên
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

// 👉 Cập nhật giáo viên
export const updateTeacher = async (req, res, next) => {
    console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  try {
    const {
      fullName,
      email,
      subject,
      status = "Đang làm việc",
      startDate,
      endDate
    } = req.body;

    if (!fullName || !email || !subject || !startDate) {
      return handleValidationError("Thiếu thông tin bắt buộc", 400);
    }

    if (status === "Đã thôi việc" && !endDate) {
      return handleValidationError("Thiếu ngày kết thúc nếu đã thôi việc", 400);
    }

    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = {
      fullName,
      email,
      subject,
      status,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    };

    if (avatar) updatedData.avatar = avatar;

    const updated = await Teacher.findByIdAndUpdate(
      req.params.id,
      updatedData,
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
