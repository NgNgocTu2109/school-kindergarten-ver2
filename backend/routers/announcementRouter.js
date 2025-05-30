import express from "express";
import {
  getAllAnnouncements,
  createAnnouncement,
  deleteAnnouncement
} from "../controllers/announcementController.js";

const router = express.Router();

// ✅ Lấy danh sách thông báo
router.get("/getall", getAllAnnouncements);

// ✅ Tạo thông báo mới
router.post("/", createAnnouncement);

// ✅ Xoá thông báo theo ID
router.delete("/:id", deleteAnnouncement);

export default router;
