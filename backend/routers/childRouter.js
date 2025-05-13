import express from "express";
import {
  createChild,
  getAllChildren,
  updateChild,
  deleteChild,
  searchChildByName
} from "../controllers/childController.js";

const router = express.Router();

// [POST] Thêm học sinh mới
router.post("/", createChild);

// [GET] Lấy danh sách học sinh (tất cả hoặc theo lớp)
router.get("/", getAllChildren);

// [PUT] Cập nhật học sinh
router.put("/:id", updateChild);

// [DELETE] Xóa học sinh
router.delete("/:id", deleteChild);

router.get("/search", searchChildByName);

export default router;
