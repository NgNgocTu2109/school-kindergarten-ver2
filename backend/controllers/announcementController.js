import { Announcement } from "../models/announcementSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAnnouncement = async (req, res, next) => {
  console.log(req.body);
  const { announcement } = req.body;
  try {
   if (!announcement) {
    handleValidationError("Please Fill Form!", 400);
  }
  await Announcement.create({ announcement });
  res.status(200).json({
    success: true,
    message: "Announcement is Created!",
  });   
} catch (err) {
  next(err);
} 
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
   const announcements = await Announcement.find();
  res.status(200).json({
    success: true,
    announcements,
  });   
} catch (err) {
  next(err);
}
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông báo để xoá",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xoá thông báo thành công",
    });
  } catch (err) {
    next(err);
  }
};
