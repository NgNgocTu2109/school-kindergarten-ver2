import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";


// Import các router
import teacherRouter from "./routers/teacherRouter.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import announcementRouter from "./routers/announcementRouter.js";
import classRouter from "./routers/classRouter.js";
import libraryRouter from "./routers/libraryRouter.js";
import statisticsRouter from "./routers/statisticsRouter.js";
import childRouter from "./routers/childRouter.js"; 
import attendanceRouter from "./routers/attendanceRouter.js"; // Import router điểm danh
import menuRouter from "./routers/menuRouter.js"; // Import router thực đơn
import uploadRouter from "./routers/uploadRouter.js"; // Import router upload ảnh
import serviceRouter from "./routers/serviceRouter.js"; // Import router dịch vụ
import registrationRouter from "./routers/registrationRouter.js"; // Import router đăng ký dịch vụ
import tuitionRouter from "./routers/tuitionRoutes.js"; 
import billRouter from "./routers/BillRoutes.js";
import messageRouter from "./routers/messageRouter.js"; // Import router tin nhắn
import eventRouter from "./routers/eventRouter.js"; // Import router sự kiện
import contactRouter from "./routers/contactRouter.js"; // Import router liên hệ
import studentAccountRouter from "./routers/studentAccountRouter.js"; // Import router tài khoản học sinh










import validator from "validator";
const { isPassportNumber } = validator;



import { errorHandler } from "./middlewares/errorHandler.js";


// Load config từ .env
config({ path: "./config/config.env" });

const app = express();

// Middleware xử lý CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware xử lý JSON và URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình truy cập ảnh (static folder)
app.use('/uploads', express.static('uploads'));

// Các tuyến API
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/statistics", statisticsRouter);
app.use("/api/v1/children", childRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/registrations", registrationRouter);
app.use("/api/v1/tuition", tuitionRouter);
app.use("/api/v1/bill", billRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/studentaccount", studentAccountRouter);








// Middleware xử lý lỗi (phải để cuối cùng)
app.use(errorHandler);

// Kết nối database
dbConnection();

export default app;
