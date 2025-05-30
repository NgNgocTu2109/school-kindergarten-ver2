import { Child } from "../models/childSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import fs from "fs";
import path from "path";

// [POST] Thêm học sinh mới
export const createChild = async (req, res, next) => {
  const { fullName, birthday, gender, classId, parentId } = req.body;

  try {
    if (!fullName || !birthday || !gender || !classId) {
      return handleValidationError("Vui lòng nhập đầy đủ thông tin học sinh!", 400);
    }

    const avatar = req.file?.filename || "";

    const newChild = await Child.create({ fullName, birthday, gender, classId, parentId, avatar });
    res.status(201).json({ success: true, message: "Thêm học sinh thành công!", child: newChild });
  } catch (err) {
    next(err);
  }
};

// [GET] Lấy tất cả học sinh hoặc theo classId
export const getAllChildren = async (req, res, next) => {
  const { classId } = req.query;

  try {
    const query = classId ? { classId } : {};
    const children = await Child.find(query).populate("classId", "grade").populate("parentId", "fullName");
    res.status(200).json({ success: true, children });
  } catch (err) {
    next(err);
  }
};

// [PUT] Cập nhật học sinh
export const updateChild = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, birthday, gender, classId, parentId } = req.body;

  try {
    const child = await Child.findById(id);
    if (!child) {
      return res.status(404).json({ success: false, message: "Không tìm thấy học sinh!" });
    }

    // Nếu có ảnh mới, xóa ảnh cũ
    let avatar = child.avatar;
    if (req.file?.filename) {
      if (avatar) {
        const oldPath = path.join("uploads", avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      avatar = req.file.filename;
    }

    const updated = await Child.findByIdAndUpdate(
      id,
      { fullName, birthday, gender, classId, parentId, avatar },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Cập nhật thành công!", child: updated });
  } catch (err) {
    next(err);
  }
};

// [DELETE] Xóa học sinh
export const deleteChild = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Child.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy học sinh!" });
    }

    // Xóa ảnh nếu có
    if (deleted.avatar) {
      const imgPath = path.join("uploads", deleted.avatar);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ success: true, message: "Đã xóa học sinh!" });
  } catch (err) {
    next(err);
  }
};

// [GET] Tìm kiếm theo tên

export const searchChildByName = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).json({ success: false, message: "Thiếu tên để tìm!" });
    }

    const children = await Child.find({
      fullName: { $regex: name, $options: "i" },
    }).populate("classId", "grade"); // ✅ populate thông tin lớp

    res.status(200).json({ success: true, children });
  } catch (err) {
    next(err);
  }
};

