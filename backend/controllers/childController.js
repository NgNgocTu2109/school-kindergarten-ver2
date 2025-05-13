import { Child } from "../models/childSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// [POST] Thêm học sinh mới
export const createChild = async (req, res, next) => {
  const { fullName, birthday, gender, classId, parentId } = req.body;

  try {
    if (!fullName || !birthday || !gender || !classId) {
      return handleValidationError("Vui lòng nhập đầy đủ thông tin học sinh!", 400);
    }

    const newChild = await Child.create({ fullName, birthday, gender, classId, parentId });
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
    const updated = await Child.findByIdAndUpdate(
      id,
      { fullName, birthday, gender, classId, parentId },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Không tìm thấy học sinh!" });
    }

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

    res.status(200).json({ success: true, message: "Đã xóa học sinh!" });
  } catch (err) {
    next(err);
  }
};

export const searchChildByName = async (req, res, next) => {
    const { name } = req.query;
    try {
      if (!name) return res.status(400).json({ success: false, message: "Thiếu tên để tìm!" });
  
      const children = await Child.find({
        fullName: { $regex: name, $options: "i" },
      });
  
      res.status(200).json({ success: true, children });
    } catch (err) {
      next(err);
    }
  };

  



  