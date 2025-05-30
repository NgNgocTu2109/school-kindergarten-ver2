import { Announcement } from "../models/announcementSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// ✅ Tạo thông báo mới
export const createAnnouncement = async (req, res, next) => {
  const { content } = req.body;

  try {
    if (!content) {
      return handleValidationError("Vui lòng nhập nội dung thông báo!", 400);
    }

    await Announcement.create({ content });

    res.status(200).json({
      success: true,
      message: "Tạo thông báo thành công!",
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy tất cả thông báo
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }); // Mới nhất lên đầu
    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Xoá thông báo
export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông báo để xoá!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Đã xoá thông báo!",
    });
  } catch (err) {
    next(err);
  }
};
