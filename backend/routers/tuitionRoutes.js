import express from "express";
import {
  setTuition,
  getTuitionByClassId,
  getAllTuitions,
} from "../controllers/tuitionController.js";

const router = express.Router();

router.post("/set", setTuition);                   // Thêm/sửa học phí
router.get("/:classId", getTuitionByClassId);      // Lấy học phí theo classId
router.get("/", getAllTuitions);                   // Lấy toàn bộ học phí (admin)

export default router;
