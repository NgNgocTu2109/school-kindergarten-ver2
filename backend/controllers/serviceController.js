
import { Service } from "../models/serviceSchema.js";
import path from "path";
import fs from "fs";

// Lấy tất cả dịch vụ
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

// Tạo dịch vụ mới
export const createService = async (req, res, next) => {
  try {
    const { name, price, type, description } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = req.file.filename; // lưu tên file (giả định lưu trong /uploads)
    }

    const newService = await Service.create({
      name,
      price,
      type,
      description,
      image: imagePath
    });

    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    next(err);
  }
};

// Cập nhật dịch vụ
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, type, description } = req.body;
    let updatedFields = { name, price, type, description };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updated = await Service.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });

    res.status(200).json({ success: true, service: updated });
  } catch (err) {
    next(err);
  }
};

// Xoá dịch vụ
export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });

    // Xoá ảnh cũ nếu có
    if (deleted.image) {
      const imagePath = path.join("uploads", deleted.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ success: true, message: "Đã xoá dịch vụ!" });
  } catch (err) {
    next(err);
  }
};
