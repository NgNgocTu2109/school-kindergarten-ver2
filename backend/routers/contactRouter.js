import express from "express";
import { sendContactMessage, getAllContactMessages } from "../controllers/contactController.js";

const router = express.Router();

// Người lạ gửi liên hệ
router.post("/", sendContactMessage);

// Admin xem tất cả liên hệ
router.get("/", getAllContactMessages);

export default router;
