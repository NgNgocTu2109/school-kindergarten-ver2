import express from "express";
import multer from "multer";
import path from "path";
import {
  createEvent,
  getAllEvents,
  getEventsByClass,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Tạo sự kiện
router.post("/", upload.single("image"), createEvent);

// Lấy tất cả sự kiện
router.get("/", getAllEvents);

router.get("/all", getAllEvents);


// Lấy sự kiện theo classId
router.get("/class/:classId", getEventsByClass);

// Xoá sự kiện
router.delete("/:id", deleteEvent);

// Cập nhật sự kiện
router.put("/:id", upload.single("image"), updateEvent);

export default router;
