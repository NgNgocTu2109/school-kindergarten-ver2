import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";

// Import các router
import studentRouter from "./routers/studentRouter.js";
import teacherRouter from "./routers/teacherRouter.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import announcementRouter from "./routers/announcementRouter.js";
import classRouter from "./routers/classRouter.js";
import libraryRouter from "./routers/libraryRouter.js";
import eventsRouter from "./routers/eventsRouter.js";
import examRouter from "./routers/examRouter.js";
import attendanceRouter from "./routers/attendanceRouter.js";
import extracurricularRoutes from "./routers/extracurricularRoutes.js"; // Import router

import { errorHandler } from "./middlewares/errorHandler.js";


// Load config từ .env
config({ path: "./config/config.env" });

const app = express();


// Middleware xử lý CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Dùng mặc định nếu biến môi trường chưa có
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware xử lý JSON và URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Các tuyến API
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/extracurriculars", extracurricularRoutes);



// Middleware xử lý lỗi - Đặt cuối cùng
app.use(errorHandler);

// Kết nối database
dbConnection();

export default app;
