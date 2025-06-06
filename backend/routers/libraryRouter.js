import express from "express";
import {
  getAllBooks,
  createBook,
  borrowBook,
  returnBook,
  getBorrowHistory,
  deleteBook,
} from "../controllers/libraryController.js";
import { verifyStudentToken } from "../middlewares/verifyStudentToken.js"; // ✅ sửa đúng tên file

const router = express.Router();

// Quản lý sách
router.get("/getall", getAllBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook);

// Mượn / trả sách – lấy studentId từ token
router.post("/borrow", verifyStudentToken, borrowBook);
router.put("/return", verifyStudentToken, returnBook);

// Lịch sử mượn – lấy studentId từ token
router.get("/history", verifyStudentToken, getBorrowHistory);

export default router;
