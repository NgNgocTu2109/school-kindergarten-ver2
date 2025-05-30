import express from "express";
import multer from "multer";
import {
  markAttendance,
  getAttendanceByClassAndDate,
  getAttendanceByChild,
} from "../controllers/attendanceController.js";

const router = express.Router();

// ✅ Cấu hình multer giống như service
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST: điểm danh kèm ảnh
router.post("/", upload.single("image"), markAttendance);

// GET: lấy danh sách điểm danh theo lớp và ngày
router.get("/", getAttendanceByClassAndDate);

// GET: lấy điểm danh theo học sinh và ngày
router.get("/child/:childId", getAttendanceByChild);

export default router;
