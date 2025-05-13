import { Attendance } from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// [POST] Tạo / cập nhật điểm danh + nhật ký
export const markAttendance = async (req, res, next) => {
  const {
    childId,
    classId,
    date,
    status,
    note,
    comment,
    eat,
    sleep,
  } = req.body;

  try {
    if (!childId || !classId || !date || !status) {
      return handleValidationError("Thiếu thông tin bắt buộc!", 400);
    }

    const attendance = await Attendance.findOneAndUpdate(
      { childId, classId, date },
      { status, note, comment, eat, sleep },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Lưu điểm danh và nhật ký thành công!",
      attendance,
    });
  } catch (err) {
    next(err);
  }
};

// [GET] Lấy điểm danh theo lớp và ngày
export const getAttendanceByClassAndDate = async (req, res, next) => {
  const { classId, date } = req.query;

  try {
    if (!classId || !date) {
      return handleValidationError("Thiếu classId hoặc date!", 400);
    }

    const records = await Attendance.find({ classId, date })
      .populate("childId", "fullName");

    res.status(200).json({
      success: true,
      attendance: records,
    });
  } catch (err) {
    next(err);
  }
};

// [GET] Lấy điểm danh theo bé + ngày
export const getAttendanceByChild = async (req, res, next) => {
  const { childId } = req.params;
  const { date } = req.query;

  try {
    if (!childId || !date) {
      return handleValidationError("Thiếu childId hoặc date!", 400);
    }

    const record = await Attendance.findOne({ childId, date })
      .populate("childId", "fullName");

    if (!record) {
      return res.status(200).json({
        success: true,
        attendance: null,
        message: "Chưa có điểm danh ngày này",
      });
    }

    res.status(200).json({
      success: true,
      attendance: record,
    });
  } catch (err) {
    next(err);
  }
};
