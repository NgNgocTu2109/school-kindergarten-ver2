import { Event } from "../models/eventSchema.js";
import { Class } from "../models/classSchema.js"; 
import path from "path";
import fs from "fs";

// Tạo sự kiện
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, type, image, classIds } = req.body;

    if (!title || !description || !date || !type || !image || !classIds || !classIds.length) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
    }

    const parsedClassIds = Array.isArray(classIds) ? classIds : [classIds];

    const newEvent = await Event.create({
      title,
      description,
      date: new Date(date),
      type,
      image,
      classIds: parsedClassIds,
    });

    res.status(201).json({ success: true, event: newEvent });
  } catch (err) {
    console.error("Lỗi tạo sự kiện:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy tất cả sự kiện
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("classIds", "grade ageGroup")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error("Lỗi khi lấy sự kiện:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy sự kiện theo class
export const getEventsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const events = await Event.find({ classIds: classId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Xoá sự kiện
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ success: false, message: "Không tìm thấy" });

    const filePath = path.join("uploads", event.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.status(200).json({ success: true, message: "Đã xoá" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cập nhật sự kiện
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file?.filename) updateData.image = req.file.filename;

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
