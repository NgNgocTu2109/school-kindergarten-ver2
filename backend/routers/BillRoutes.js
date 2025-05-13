import express from "express";
import { generateMonthlyBills, getAllBillsByMonth,
    getBillsByStudent, toggleBillPaidStatus } from "../controllers/BillController.js";

const router = express.Router();

router.post("/generate", generateMonthlyBills); // POST /api/v1/bill/generate?month=2025-05
router.get("/month", getAllBillsByMonth);           // Admin xem toàn bộ theo tháng
router.get("/student/:studentId", getBillsByStudent); // Phụ huynh xem hóa đơn con
router.put("/:id/toggle-paid", toggleBillPaidStatus);

export default router;
