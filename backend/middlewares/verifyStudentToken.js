import jwt from "jsonwebtoken";
import { handleValidationError } from "./errorHandler.js";

export const verifyStudentToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer token"
    if (!token) {
      console.log("Không tìm thấy token trong header Authorization");
      return handleValidationError("Không tìm thấy token!", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.childId = decoded.childId; // lưu vào req
    console.log("childId nhận từ token trong middleware:", req.childId);
    next();
  } catch (err) {
    console.log("Lỗi verify token:", err.message);
    return handleValidationError("Token không hợp lệ hoặc đã hết hạn!", 403);
  }
};
