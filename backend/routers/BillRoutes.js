import express from "express";
import {
  generateMonthlyBills,
  getAllBillsByMonth,
  getBillsByStudent,
  getBillsForLoggedStudent,  // ✅ Mới thêm
  toggleBillPaidStatus
} from "../controllers/BillController.js";

import { verifyStudentToken } from "../middlewares/verifyStudentToken.js"; // ✅ Middleware xác thực học sinh

const router = express.Router();

router.post("/generate", generateMonthlyBills); // Admin tạo hóa đơn
router.get("/month", getAllBillsByMonth);       // Admin xem toàn bộ theo tháng

// ✅ Phụ huynh (student) xem hóa đơn con mình bằng token
router.get("/student", verifyStudentToken, getBillsForLoggedStudent);

// ✅ Trường hợp cũ nếu vẫn cần
router.get("/student/:studentId", getBillsByStudent);

router.put("/:id/toggle-paid", toggleBillPaidStatus); // Admin cập nhật trạng thái thanh toán

export default router;
