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

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ⚠️ Đặt route tìm kiếm trước route ID
router.get("/search", searchChildByName);

router.post("/", upload.single("avatar"), createChild);
router.get("/", getAllChildren);
router.get("/:id", getChildById);
router.put("/:id", upload.single("avatar"), updateChild);
router.delete("/:id", deleteChild);

export default router;
