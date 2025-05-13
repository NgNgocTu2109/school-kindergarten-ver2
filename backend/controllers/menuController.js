import { Menu } from "../models/menuSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// Helper: chuyển về đầu ngày ISO (00:00:00)
const normalizeDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// [POST] Thêm hoặc cập nhật thực đơn
export const upsertMenu = async (req, res, next) => {
  const { classId, date, breakfast, lunch } = req.body;

  try {
    if (!classId || !date || !breakfast || !lunch) {
      return handleValidationError("Vui lòng điền đầy đủ thông tin!", 400);
    }

    const normalizedDate = normalizeDate(date);

    const menu = await Menu.findOneAndUpdate(
      { classId, date: normalizedDate },
      { breakfast, lunch },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Lưu thực đơn thành công!",
      menu,
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

// [GET] Lấy toàn bộ thực đơn (tuỳ chọn admin dùng)
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
