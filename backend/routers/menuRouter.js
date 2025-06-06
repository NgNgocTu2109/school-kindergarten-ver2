import express from "express";
import {
  upsertMenu,
  getMenuByClassAndDate,
  getAllMenus,
  getMenuHistory
} from "../controllers/menuController.js";

const router = express.Router();

// [POST] Thêm hoặc cập nhật thực đơn
router.post("/", upsertMenu);

// [GET] Lấy thực đơn theo lớp và ngày
router.get("/", getMenuByClassAndDate);

// [GET] Lấy toàn bộ thực đơn (admin dùng)
router.get("/all", getAllMenus);

router.get("/history", getMenuHistory);


export default router;
