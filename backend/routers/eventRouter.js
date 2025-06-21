import express from "express";
import multer from "multer";
import path from "path";
import {
  createEvent,
  getAllEvents,
  getEventsByClass,
  deleteEvent,
  updateEvent,
  registerEventParticipant,
  getEventParticipants,
  toggleEventRegistration,
  getStudentRegisteredEvents,
  getEventHistoryByChild
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

//  Tạo sự kiện mới (có ảnh)
router.post("/", upload.single("image"), createEvent);

//  Lấy tất cả sự kiện
router.get("/", getAllEvents);
router.get("/all", getAllEvents); // fallback route

// Lấy sự kiện theo classId
router.get("/class/:classId", getEventsByClass);

//  Xoá sự kiện
router.delete("/:id", deleteEvent);

//  Cập nhật sự kiện (có ảnh mới)
router.put("/:id", upload.single("image"), updateEvent);

//  Học sinh tham gia sự kiện
router.post("/:eventId/participate", registerEventParticipant);


//  Admin lấy danh sách học sinh tham gia sự kiện
router.get("/:eventId/participants", getEventParticipants);

router.post("/:eventId/toggle", toggleEventRegistration);

router.get("/registered", getStudentRegisteredEvents);

// Lấy lịch sử sự kiện của học sinh
router.get("/history", getEventHistoryByChild);


export default router;
