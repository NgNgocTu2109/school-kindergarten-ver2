import express from "express";
import {
    sendMessage,
    getAllMessages,
    replyMessage,
    getMessagesByChild,
    deleteMessage,
    updateMessage
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/all", getAllMessages);
router.post("/reply/:messageId", replyMessage);
router.get("/by-child/:childId", getMessagesByChild);
router.delete("/:messageId", deleteMessage);
router.put("/:messageId", updateMessage);


export default router;
