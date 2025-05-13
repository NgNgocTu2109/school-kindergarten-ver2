import express from "express";
import {
  addClassStatistics,
  getClassStatistics,
  addAttendanceStatistics,
  getAttendanceStatistics,
  addHealthStatistics,
  getHealthStatistics,
} from "../controllers/statisticsController.js";

const router = express.Router();

// Sĩ số lớp học
router.post("/classes", addClassStatistics);
router.get("/classes", getClassStatistics);

// Tỷ lệ đi học/vắng mặt
router.post("/attendance", addAttendanceStatistics);
router.get("/attendance", getAttendanceStatistics);

// Tình trạng sức khỏe
router.post("/health", addHealthStatistics);
router.get("/health", getHealthStatistics);

export default router;
