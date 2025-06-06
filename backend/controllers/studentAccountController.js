import { StudentAccount } from "../models/studentAccountSchema.js";
import { Child } from "../models/childSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Đăng nhập học sinh
export const studentLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const account = await StudentAccount.findOne({ email }).populate("childId");
    if (!account) {
      return res.status(400).json({ success: false, message: "Email không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" });
    }

    const token = jwt.sign(
      { childId: account.childId._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công!",
      token,
      child: account.childId, // Trả về thông tin học sinh
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy tất cả tài khoản học sinh (Admin dùng)
export const getAllStudentAccounts = async (req, res, next) => {
  try {
    const accounts = await StudentAccount.find()
      .populate({
        path: "childId",
        select: "fullName classId",
        populate: {
          path: "classId",
          select: "grade"
        }
      });

    res.status(200).json({ success: true, accounts });
  } catch (err) {
    next(err);
  }
};

// ✅ [GET] /auth/me - Lấy thông tin học sinh từ token
export const getStudentProfile = async (req, res) => {
  try {
    const child = await Child.findById(req.childId).populate("classId", "grade");
    if (!child) return res.status(404).json({ success: false, message: "Không tìm thấy học sinh" });

    res.status(200).json({ success: true, child });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ [GET] /me – Trả về childId từ token (dùng cho học sinh)
export const getMe = async (req, res) => {
  try {
    const childId = req.childId;
    if (!childId) {
      return res.status(401).json({ success: false, message: "Không tìm thấy học sinh!" });
    }

    res.status(200).json({ success: true, child: { _id: childId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ [DELETE] /api/v1/studentaccount/:id - Xoá tài khoản học sinh
export const deleteStudentAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await StudentAccount.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy tài khoản!" });
    }

    res.status(200).json({ success: true, message: "Đã xoá tài khoản học sinh!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
