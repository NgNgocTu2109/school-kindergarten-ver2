import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ .env

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "SCHOOL_KINDERGARTEN", // Đảm bảo kết nối đến đúng database
    });
    console.log("✅ Connected to database successfully!");
  } catch (error) {
    console.error("❌ Error while connecting to database:", error.message);
  }
};
