import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  const fileUrl = `http://localhost:4000/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, imageUrl: fileUrl });
});

export default router;
