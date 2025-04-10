import validator from "validator";
import { ExtracurricularActivity } from "../models/extracurricularActivitySchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import mongoose from "mongoose";
import "../models/adminSchema.js"; // Chỉ import để đảm bảo model được đăng ký



// Tạo hoạt động ngoại khóa mới
export const createExtracurricularActivity = async (req, res, next) => {
  console.log("📩 Received data from frontend:", req.body); // Debug dữ liệu từ FE

  const { name, description, date, location, createdBy } = req.body;

  if (!name || !description || !date || !location || !createdBy) {
    return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Kiểm tra định dạng ngày tháng
  if (!validator.isISO8601(date)) {
    return res.status(400).json({ success: false, message: "Định dạng ngày không hợp lệ! Yêu cầu: YYYY-MM-DD" });
  }

  try {
    const newActivity = await ExtracurricularActivity.create({
      name,
      description,
      date: new Date(date), // Chuyển đổi sang kiểu Date
      location,
      createdBy
    });

    console.log("✅ Activity created:", newActivity); // Log khi tạo thành công
    return res.status(201).json({ success: true, message: "Đã tạo hoạt động!", activity: newActivity });

  } catch (err) {
    console.error("❌ Lỗi khi tạo hoạt động:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};

// Lấy danh sách tất cả hoạt động ngoại khóa
export const getAllExtracurricularActivities = async (req, res, next) => {
  try {
    console.log("🔍 Fetching all extracurricular activities...");
    const activities = await ExtracurricularActivity.find().populate("createdBy");
    
    console.log("📌 Fetched activities:", activities); // Debug danh sách hoạt động
    return res.status(200).json({ success: true, activities });

  } catch (err) {
    console.error("❌ Lỗi trong getAllExtracurricularActivities:", err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};
