import express from "express";
import multer from "multer";
import {
  markAttendance,
  getAttendanceByClassAndDate,
  getAttendanceByChild,
  getDiaryByChildAndDate,
  getAttendanceHistory, //  bổ sung
  getWeeklyDiaryByChild,
  getAttendanceHistoryByChild
} from "../controllers/attendanceController.js";

const router = express.Router();

//  Cấu hình multer giống như service
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

//  POST: điểm danh kèm ảnh
router.post("/", upload.single("image"), markAttendance);

//  GET: danh sách điểm danh theo lớp và ngày
router.get("/", getAttendanceByClassAndDate);

//  GET: điểm danh theo học sinh và ngày
router.get("/child/:childId", getAttendanceByChild);

//  GET: nhật ký bé (điểm danh + thực đơn)
router.get("/diary/:childId", getDiaryByChildAndDate);

//  GET: lịch sử điểm danh theo lớp và khoảng ngày
router.get("/history", getAttendanceHistory);

router.get("/weekly", getWeeklyDiaryByChild);

// ✅ GET: lịch sử điểm danh theo học sinh
router.get("/child-history", getAttendanceHistoryByChild);


export default router;
