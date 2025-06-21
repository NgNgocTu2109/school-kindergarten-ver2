import express from "express";
import multer from "multer";
import {
  getAllTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher
} from "../controllers/teacherController.js";

const router = express.Router();

// 👇 Cấu hình multer để lưu ảnh vào thư mục 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 👇 Các route có hỗ trợ upload ảnh
router.get('/', getAllTeachers);         // GET /api/v1/teachers
router.post('/', upload.single("avatar"), createTeacher);   // POST có ảnh
router.put('/:id', upload.single("avatar"), updateTeacher); // PUT có ảnh
router.delete('/:id', deleteTeacher);

export default router;
