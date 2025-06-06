import express from "express";
import {
  sendMessage,
  getAllMessages,
  replyMessage,
  getMessagesByChild,
  deleteMessage,
  updateMessage
} from "../controllers/messageController.js";

import { verifyStudentToken } from "../middlewares/verifyStudentToken.js";

const router = express.Router();

// ✅ Học sinh gửi tin nhắn (token sẽ lấy childId)
router.post("/send", verifyStudentToken, sendMessage);

// ✅ Học sinh xem toàn bộ tin nhắn của mình (token lấy childId)
router.get("/student", verifyStudentToken, getMessagesByChild);

// ✅ Giáo viên dùng các route dưới đây
router.get("/all", getAllMessages);
router.post("/reply/:messageId", replyMessage);
router.delete("/:messageId", deleteMessage);
router.put("/:messageId", updateMessage);

export default router;
