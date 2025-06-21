import { Menu } from "../models/menuSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Helper: chuẩn hóa về đầu ngày
const normalizeDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// ✅ [POST] Thêm hoặc cập nhật thực đơn cho nhiều lớp
export const upsertMenu = async (req, res, next) => {
  const { classIds, date, breakfast, lunch } = req.body;

  try {
    if (!classIds || !Array.isArray(classIds) || classIds.length === 0 || !date || !breakfast || !lunch) {
      return handleValidationError("Vui lòng điền đầy đủ thông tin và chọn ít nhất 1 lớp!", 400);
    }

    const normalizedDate = normalizeDate(date);
    const results = [];

    for (const classId of classIds) {
      const updated = await Menu.findOneAndUpdate(
        { classId, date: normalizedDate },
        { breakfast, lunch, classId }, // luôn gán đúng classId
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push(updated);
    }

    res.status(200).json({
      success: true,
      message: "Lưu thực đơn thành công cho các lớp!",
      menus: results,
    });
  } catch (err) {
    next(err);
  }
};

// [GET] Lấy thực đơn theo lớp và ngày
export const getMenuByClassAndDate = async (req, res, next) => {
  const { classId, date } = req.query;

  try {
    if (!classId || !date) {
      return handleValidationError("Thiếu classId hoặc date!", 400);
    }

    const normalizedDate = normalizeDate(date);

    const menu = await Menu.findOne({ classId, date: normalizedDate });

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    next(err);
  }
};

// [GET] Lấy toàn bộ thực đơn
export const getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().populate("classId", "grade").sort({ date: -1 });
    res.status(200).json({
      success: true,
      menus,
    });
  } catch (err) {
    next(err);
  }
};


export const getMenuHistory = async (req, res, next) => {
  const { classId, start, end } = req.query;

  try {
    if (!classId) return handleValidationError("Thiếu classId", 400);

    const query = { classId };

    // Nếu có start & end → lọc theo khoảng ngày
    if (start && end) {
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);

      query.date = { $gte: startDate, $lte: endDate };
    }

    const menus = await Menu.find(query).sort({ date: 1 }); // sort tăng dần để hiển thị theo tuần

    res.status(200).json({ success: true, menus });
  } catch (err) {
    next(err);
  }
};

