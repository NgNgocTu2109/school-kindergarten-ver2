import express from "express";
import multer from "multer";
import {
  createChild,
  getAllChildren,
  updateChild,
  deleteChild,
  searchChildByName,
  getChildById, 
} from "../controllers/childController.js";

const router = express.Router();

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// [POST] Thêm học sinh mới (kèm ảnh)
router.post("/", upload.single("avatar"), createChild);

// [GET] Lấy danh sách học sinh (tất cả hoặc theo lớp)
router.get("/", getAllChildren);

// [GET] Lấy thông tin học sinh theo ID (dùng cho student login)
router.get("/:id", getChildById); 

// [PUT] Cập nhật học sinh (có thể thay ảnh)
router.put("/:id", upload.single("avatar"), updateChild);

// [DELETE] Xóa học sinh
router.delete("/:id", deleteChild);

// [GET] Tìm kiếm theo tên
router.get("/search", searchChildByName);

export default router;
