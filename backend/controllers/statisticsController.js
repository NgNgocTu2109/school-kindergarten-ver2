import { Service } from "../models/serviceSchema.js";
import { ServiceRegistration } from "../models/registrationSchema.js";
import { Event } from "../models/eventSchema.js";
import { Child } from "../models/childSchema.js";
import { Attendance } from "../models/attendanceSchema.js";
import { Menu } from "../models/menuSchema.js";
import { Statistics } from "../models/statisticsSchema.js";
import { Class } from "../models/classSchema.js";

export const getStatisticsOverview = async (req, res) => {
  try {
    const totalChildren = await Child.countDocuments();

    // Dịch vụ
    const services = await Service.find();
    const registrations = await ServiceRegistration.find();
    const serviceStats = services.map(service => {
      const count = registrations.filter(r =>
        r.serviceId && r.serviceId.toString() === service._id.toString()
      ).length;

      return {
        name: service.name,
        totalRegistered: count
      };
    });

    // Sự kiện
    const events = await Event.find();
    const eventStats = events.map(event => {
      const registered = event.eventHistory?.filter(e => e.status === 'registered').length || 0;
      return {
        title: event.title,
        totalParticipants: registered
      };
    });

    // Điểm danh
    const attendances = await Attendance.find();
    const attendanceStats = {};
    attendances.forEach(record => {
      const date = new Date(record.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!attendanceStats[month]) {
        attendanceStats[month] = { present: 0, absent: 0, total: 0 };
      }

      if (Array.isArray(record.records)) {
        record.records.forEach(r => {
          attendanceStats[month].total += 1;
          if (r.status === "Có mặt") attendanceStats[month].present += 1;
          else attendanceStats[month].absent += 1;
        });
      }
    });

    const attendanceSummary = Object.entries(attendanceStats).map(([month, stats]) => ({
      month,
      presentRate: ((stats.present / (stats.total || 1)) * 100).toFixed(1),
      absentRate: ((stats.absent / (stats.total || 1)) * 100).toFixed(1),
    }));

    // Thực đơn
   const menus = await Menu.find(); // Không dùng populate
const classes = await Class.find({}, "_id grade ageGroup");

// Map classId to tên lớp
const classMap = {};
classes.forEach(cls => {
  const name = `${cls.grade} ${cls.ageGroup}`.trim();
  classMap[cls._id.toString()] = name;
});

// Gom dữ liệu theo classId + tháng
const menuStats = {};
menus.forEach(menu => {
  const rawId = menu.classId?.toString();
  if (!rawId) return;

  const date = new Date(menu.date);
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const key = `${rawId}-${month}`;

  if (!menuStats[key]) {
    menuStats[key] = {
      classId: rawId,
      className: classMap[rawId] || "Không rõ",
      month,
      count: 0
    };
  }

  menuStats[key].count += 1;
});

const menuSummary = Object.values(menuStats)
  .filter(item => item.className !== "Không rõ") //  Loại bỏ các lớp không rõ
  .map(item => ({
    classId: item.classId,
    className: item.className,
    month: item.month,
    daysWithMenu: item.count
  }));




    res.status(200).json({
      success: true,
      totalChildren,
      serviceStats,
      eventStats,
      attendanceSummary,
      menuSummary
    });

  } catch (error) {
    console.error("❌ Lỗi khi thống kê:", error);
    res.status(500).json({ success: false, message: "Lỗi server khi lấy thống kê" });
  }
};
