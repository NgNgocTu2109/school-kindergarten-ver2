import express from "express";
import {
  studentLogin,
  getAllStudentAccounts,
  getStudentProfile,
  getMe,
  deleteStudentAccount
} from "../controllers/studentAccountController.js";
import { verifyStudentToken } from "../middlewares/verifyStudentToken.js";

const router = express.Router();

// Đăng nhập
router.post("/login", studentLogin);

// Admin lấy danh sách
router.get("/all", getAllStudentAccounts);

//  Lấy thông tin học sinh đầy đủ (profile)
router.get("/profile", verifyStudentToken, getStudentProfile);

//  Trả về chỉ childId (dùng cho auth xác thực)
router.get("/me", verifyStudentToken, getMe);

//  Xoá tài khoản học sinh
router.delete("/:id", deleteStudentAccount);

export default router;
