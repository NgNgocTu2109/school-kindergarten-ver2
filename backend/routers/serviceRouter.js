import express from "express";
import multer from "multer";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  recordServiceUsage,
  getServiceUsageByChild,
} from "../controllers/serviceController.js";

const router = express.Router();

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// === Các route chính ===
router.get("/", getAllServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

// === Các route cho ghi nhận sử dụng dịch vụ ===
router.post("/:serviceId/usage", upload.single("image"), recordServiceUsage);
router.get("/usage/:childId", getServiceUsageByChild);

// ✅ Đã xoá: router.get("/registered/:childId", getRegisteredServicesByChild);

export default router;
