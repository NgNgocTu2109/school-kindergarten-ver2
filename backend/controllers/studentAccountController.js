// controllers/studentAccountController.js
import { StudentAccount } from "../models/studentAccountSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
