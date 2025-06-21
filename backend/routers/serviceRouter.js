import express from "express";
import multer from "multer";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  recordServiceUsage,
  getServiceUsageByChild,
  getServiceUsageHistory
} from "../controllers/serviceController.js";
import { verifyStudentToken } from "../middlewares/verifyStudentToken.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// === Route CRUD chính ===
router.get("/", getAllServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

// === Học sinh dùng token (middleware lấy childId)
router.post("/:serviceId/usage", verifyStudentToken, upload.single("image"), recordServiceUsage);
router.get("/usage", verifyStudentToken, getServiceUsageByChild);

// === Giáo viên gửi thủ công childId (không cần token)
router.post("/:serviceId/usage-teacher", upload.single("image"), recordServiceUsage);
router.get("/usage/:childId", getServiceUsageByChild);

router.get("/usage-history", getServiceUsageHistory);

export default router;
