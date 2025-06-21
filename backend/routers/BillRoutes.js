import express from "express";
import multer from "multer";
import {
  generateMonthlyBills,
  getAllBillsByMonth,
  getBillsByStudent,
  getBillsForLoggedStudent,
  toggleBillPaidStatus,
  markPaidByStudent,
  getBillsByChildId
} from "../controllers/BillController.js";

import { verifyStudentToken } from "../middlewares/verifyStudentToken.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


// Admin tạo hóa đơn cho 1 hoặc nhiều học sinh
router.post("/generate", generateMonthlyBills);

// Admin xem danh sách hóa đơn theo tháng
router.get("/month", getAllBillsByMonth);

// Học sinh xem hóa đơn của mình bằng token
router.get("/student", verifyStudentToken, getBillsForLoggedStudent);

// (Tùy chọn) Xem hóa đơn theo studentId
router.get("/student/:studentId", getBillsByStudent);

// Admin đổi trạng thái "Đã thanh toán"
router.put("/:id/toggle-paid", toggleBillPaidStatus);

// Học sinh xác nhận "Tôi đã thanh toán"

router.put("/:id/mark-paid-by-student", verifyStudentToken, upload.single("receiptImage"), markPaidByStudent);


// Học sinh upload ảnh chuyển khoản
router.post("/:id/upload-receipt", verifyStudentToken, upload.single("receipt"), async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = "/uploads/" + req.file.filename;

    const { MonthlyBill } = await import("../models/MonthlyBillSchema.js");
    const bill = await MonthlyBill.findById(id);
    if (!bill) return res.status(404).json({ message: "Không tìm thấy hóa đơn" });

    if (bill.studentId.toString() !== req.childId.toString()) {
      return res.status(403).json({ message: "Không có quyền cập nhật hóa đơn này" });
    }

    bill.receiptImage = filePath;
    await bill.save();

    res.status(200).json({
      success: true,
      message: "Đã upload ảnh chuyển khoản",
      image: filePath,
    });
  } catch (err) {
    console.error("❌ Lỗi upload ảnh chuyển khoản:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

router.get('/child/:childId', getBillsByChildId);


export default router;
