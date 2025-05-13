import express from "express";
import {
  markAttendance,
  getAttendanceByClassAndDate,getAttendanceByChild 
} from "../controllers/attendanceController.js";

const router = express.Router();

// POST: điểm danh hoặc cập nhật điểm danh
router.post("/", markAttendance);

// GET: lấy danh sách điểm danh theo lớp và ngày
router.get("/", getAttendanceByClassAndDate);

router.get("/child/:childId", getAttendanceByChild);

export default router;
