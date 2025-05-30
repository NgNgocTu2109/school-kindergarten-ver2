import express from "express";
import {
  getAllBooks,
  createBook,
  borrowBook,
  returnBook,
  getBorrowHistory,
  deleteBook, 
} from "../controllers/libraryController.js";

const router = express.Router();

// Quản lý sách
router.get("/getall", getAllBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook); 

// Mượn / trả sách
router.post("/borrow", borrowBook);
router.put("/return", returnBook);

// Lịch sử mượn sách của học sinh
router.get("/history/:studentId", getBorrowHistory);

export default router;
