import { Event } from "../models/eventSchema.js";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

// Tạo sự kiện
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, type, image, classIds, fee, detailLink } = req.body;

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
      fee: fee || 0,
      detailLink: detailLink || "",
      participants: [],
      eventHistory: [] // Mặc định tạo trường này
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

// Lấy sự kiện theo classId
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
    if (!event) return res.status(404).json({ success: false, message: "Không tìm thấy sự kiện" });

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
    const { title, description, fee, detailLink } = req.body;

    const updateData = {
      title,
      description,
      fee,
      detailLink,
    };

    if (req.file?.filename) {
      updateData.image = req.file.filename;
    }

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, event: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ghi nhận học sinh tham gia sự kiện
export const registerEventParticipant = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { childId } = req.body;

    console.log("registerEventParticipant nhận childId:", childId, "eventId:", eventId);

    if (!childId) {
      return res.status(400).json({ success: false, message: "Thiếu childId" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: "Không tìm thấy sự kiện" });

    const childObjId = new mongoose.Types.ObjectId(childId);

    // Nếu đã có trong participants thì không thêm lại
    const isAlreadyParticipant = event.participants.some(id => id.equals(childObjId));
    if (!isAlreadyParticipant) {
      event.participants.push(childObjId);
    }

    // Nếu đã ghi log "registered" thì không thêm lại
    const alreadyLogged = event.eventHistory.some(h =>
      h.childId.equals(childObjId) && h.status === "registered"
    );
    if (!alreadyLogged) {
      event.eventHistory.push({
        childId: childObjId,
        status: "registered",
        source: "student",
        date: new Date(),
      });
    }

    await event.save();
    res.status(200).json({ success: true, message: "Đã tham gia sự kiện" });
  } catch (err) {
    console.error("Lỗi registerEventParticipant:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy danh sách học sinh đã tham gia sự kiện
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate({
      path: "participants",
      select: "fullName classId",
      populate: {
        path: "classId",
        select: "grade"
      }
    });

    if (!event) return res.status(404).json({ success: false, message: "Không tìm thấy sự kiện" });

    res.status(200).json({ success: true, participants: event.participants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Ghi nhận học sinh tham gia hoặc huỷ sự kiện (toggle)
export const toggleEventRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { childId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ success: false, message: "Không tìm thấy sự kiện" });

    const childObjId = new mongoose.Types.ObjectId(childId);
    const index = event.participants.findIndex(id => id.equals(childObjId));

    if (index !== -1) {
      // Nếu đã tồn tại => huỷ tham gia
      event.participants.splice(index, 1);
      await event.save();
      return res.status(200).json({ success: true, action: "cancelled", message: "Đã huỷ tham gia sự kiện" });
    } else {
      // Chưa có => đăng ký
      event.participants.push(childObjId);
      await event.save();
      return res.status(200).json({ success: true, action: "registered", message: "Đã tham gia sự kiện" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy danh sách sự kiện học sinh đã đăng ký - trả thêm eventIds
export const getStudentRegisteredEvents = async (req, res) => {
  try {
    const { childId } = req.query;
    if (!childId) return res.status(400).json({ success: false, message: "Thiếu childId" });

    const childObjId = new mongoose.Types.ObjectId(childId);  // Sửa ở đây
    const events = await Event.find({ participants: childObjId }).sort({ date: -1 });
    const eventIds = events.map(e => e._id.toString());  // lấy mảng id string

    res.status(200).json({ success: true, events, eventIds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

