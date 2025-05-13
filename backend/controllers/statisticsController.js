import { Statistics } from "../models/statisticsSchema.js";

// Thêm sĩ số lớp học
export const addClassStatistics = async (req, res) => {
  try {
    const { className, studentCount } = req.body;
    if (!className || studentCount === undefined) {
      return res.status(400).json({ success: false, message: "Thiếu className hoặc studentCount" });
    }

    const stats = await Statistics.create({ className, studentCount });
    res.status(201).json({ success: true, statistics: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClassStatistics = async (req, res) => {
  try {
    const stats = await Statistics.find({ className: { $exists: true }, studentCount: { $exists: true } });
    res.status(200).json({ success: true, classes: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Thêm tỷ lệ đi học/vắng mặt
export const addAttendanceStatistics = async (req, res) => {
  try {
    const { month, attendanceRate, absentRate } = req.body;
    if (!month || attendanceRate === undefined || absentRate === undefined) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin attendance" });
    }

    const stats = await Statistics.create({ month, attendanceRate, absentRate });
    res.status(201).json({ success: true, statistics: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceStatistics = async (req, res) => {
  try {
    const stats = await Statistics.find({ month: { $exists: true }, attendanceRate: { $exists: true } });
    res.status(200).json({ success: true, attendanceStats: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Thêm tình trạng sức khỏe
export const addHealthStatistics = async (req, res) => {
  try {
    const { className, name, healthStatus } = req.body;
    if (!className || !name || !healthStatus) {
      return res.status(400).json({ success: false, message: "Thiếu className, name hoặc healthStatus" });
    }

    const stats = await Statistics.create({
      className,
      healthStatus: [{ name, status: healthStatus }],
    });

    res.status(201).json({ success: true, statistics: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHealthStatistics = async (req, res) => {
  try {
    const stats = await Statistics.find({ healthStatus: { $exists: true, $ne: [] } });
    res.status(200).json({ success: true, healthStats: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/statisticsController.js

// controllers/statisticsController.js

export const getHealthStats = async (req, res) => {
  try {
    const stats = await Statistics.find({ healthStatus: { $exists: true, $ne: [] } });

    const healthStats = stats.flatMap(item =>
      item.healthStatus.map(child => ({
        name: child.name,               // Họ tên
        healthStatus: child.status,      // Tình trạng sức khỏe
        className: item.className || 'Không rõ' // Lớp học
      }))
    );

    console.log('Health Stats:', healthStats); // In dữ liệu ra console để kiểm tra

    res.json({ success: true, healthStats });
  } catch (error) {
    console.error("❌ Lỗi khi lấy dữ liệu sức khỏe:", error);
    res.status(500).json({ success: false, message: "Lỗi server khi lấy dữ liệu sức khỏe" });
  }
};


