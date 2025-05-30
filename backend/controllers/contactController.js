import { ContactMessage } from "../models/contactMessageSchema.js";

// ✅ Gửi liên hệ từ khách (người lạ)
export const sendContactMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const newMessage = await ContactMessage.create({ fullName, email, message });

    res.status(201).json({ success: true, message: "Đã gửi liên hệ!", data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi gửi liên hệ!" });
  }
};

// ✅ Admin xem toàn bộ liên hệ
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ sentAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách liên hệ!" });
  }
};
