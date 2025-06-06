import { Message } from "../models/messageSchema.js";
import { Child } from "../models/childSchema.js";

// ✅ Gửi tin nhắn từ student (lấy childId từ token)
export const sendMessage = async (req, res) => {
  const childId = req.childId; // lấy từ middleware
  const { content } = req.body;

  try {
    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ success: false, message: "Không tìm thấy học sinh" });

    const msg = await Message.create({ childId, content });
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Giáo viên xem tất cả tin nhắn
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("childId", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Trả lời tin nhắn
export const replyMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;

  try {
    const msg = await Message.findByIdAndUpdate(
      messageId,
      { $push: { replies: { from: "teacher", content } } },
      { new: true }
    );
    res.status(200).json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Student xem tất cả tin nhắn của con mình (dựa vào token)
export const getMessagesByChild = async (req, res) => {
  const childId = req.childId; // lấy từ middleware

  try {
    const messages = await Message.find({ childId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Xoá tin nhắn
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ success: true, message: "Đã xóa tin nhắn." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Cập nhật nội dung tin nhắn
export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;

  try {
    const msg = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );
    res.status(200).json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
