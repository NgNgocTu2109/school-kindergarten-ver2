import express from "express";
import multer from "multer";
import {
  getAllServices,
  createService,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// API routes
router.get("/", getAllServices);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

export default router;
