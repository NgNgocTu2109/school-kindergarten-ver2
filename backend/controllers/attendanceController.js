import { Attendance } from "../models/attendanceSchema.js";
import { Child } from "../models/childSchema.js";
import { Menu } from "../models/menuSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// [POST] Tạo / cập nhật điểm danh + nhật ký + ảnh
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

    const updateData = {
      status,
      note,
      comment,
      eat,
      sleep,
    };

    // ✅ Nếu có ảnh thì thêm vào đường dẫn đầy đủ để hiển thị trên frontend
    if (req.file && req.file.filename) {
    updateData.imageUrl = `uploads/${req.file.filename}`; // Lưu đường dẫn tương đối
}


    const attendance = await Attendance.findOneAndUpdate(
      { childId, classId, date },
      updateData,
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

    const records = await Attendance.find({ classId, date }).populate("childId", "fullName");

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

    const record = await Attendance.findOne({ childId, date }).populate("childId", "fullName");

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

// ✅ [GET] Nhật ký bé: điểm danh + thực đơn
export const getDiaryByChildAndDate = async (req, res, next) => {
  const { childId } = req.params;
  const { date } = req.query;

  try {
    if (!childId || !date) {
      return handleValidationError("Thiếu childId hoặc date!", 400);
    }

    // 1. Tìm học sinh và classId
    const child = await Child.findById(childId);
    if (!child) {
      return handleValidationError("Không tìm thấy học sinh!", 404);
    }

    const classId = child.classId?.toString();

    // 2. Tìm điểm danh
    const attendance = await Attendance.findOne({ childId, date }).populate("childId", "fullName");

    // 3. Tìm thực đơn trong ngày
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const menu = await Menu.findOne({
      classId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.status(200).json({
      success: true,
      attendance: attendance || null,
      menu: menu || null,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ [GET] Lịch sử điểm danh theo lớp và khoảng ngày
export const getAttendanceHistory = async (req, res, next) => {
  const { classId, fromDate, toDate } = req.query;

  try {
    if (!classId || !fromDate || !toDate) {
      return handleValidationError("Thiếu classId hoặc khoảng ngày!", 400);
    }

    const start = new Date(fromDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(toDate);
    end.setHours(23, 59, 59, 999);

    const records = await Attendance.find({
      classId,
      date: { $gte: start, $lte: end },
    }).populate("childId", "fullName");

    res.status(200).json({
      success: true,
      attendanceHistory: records,
    });
  } catch (err) {
    next(err);
  }
};
