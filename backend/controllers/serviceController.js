import { Service } from "../models/serviceSchema.js";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

// ✅ Lấy tất cả dịch vụ
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

// ✅ Tạo dịch vụ mới
export const createService = async (req, res, next) => {
  try {
    const { name, price, type, description } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = req.file.filename;
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

// ✅ Cập nhật dịch vụ
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

// ✅ Xoá dịch vụ
export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });

    if (deleted.image) {
      const imagePath = path.join("uploads", deleted.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.status(200).json({ success: true, message: "Đã xoá dịch vụ!" });
  } catch (err) {
    next(err);
  }
};

// ✅ Ghi nhận bé sử dụng dịch vụ
export const recordServiceUsage = async (req, res) => {
  try {
    const { childId, date, note } = req.body;
    const { serviceId } = req.params;

    if (!childId || !date) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin childId hoặc ngày"
      });
    }

    const objectChildId = new mongoose.Types.ObjectId(childId);
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ!"
      });
    }

    const usage = {
      childId: objectChildId,
      date: new Date(date),
      note: note || "",
      image: req.file?.filename || null,
      createdAt: new Date()
    };

    service.usageRecords.push(usage);
    await service.save();

    res.status(201).json({
      success: true,
      message: "Đã ghi nhận sử dụng dịch vụ",
      usage
    });
  } catch (err) {
    console.error("Lỗi ghi nhận sử dụng:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Lấy lịch sử sử dụng dịch vụ theo childId
export const getServiceUsageByChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const objectChildId = new mongoose.Types.ObjectId(childId);

    const services = await Service.find({
      "usageRecords.childId": objectChildId
    });

    const filtered = services.map(s => ({
      name: s.name,
      image: s.image,
      usageRecords: s.usageRecords.filter(u => u.childId.toString() === childId)
    }));

    res.status(200).json({ success: true, services: filtered });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
