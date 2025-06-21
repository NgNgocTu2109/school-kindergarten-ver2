import { Attendance } from "../models/attendanceSchema.js";
import { Tuition } from "../models/TuitionSchema.js";
import { Child } from "../models/childSchema.js";
import { ServiceRegistration } from "../models/registrationSchema.js";
import { Service } from "../models/serviceSchema.js";
import { MonthlyBill } from "../models/MonthlyBillSchema.js";
import { Event } from "../models/eventSchema.js";



import mongoose from "mongoose";

// Tạo hóa đơn tháng
export const generateMonthlyBills = async (req, res) => {
  try {
    const { month, childId } = req.query;
    if (!month) return res.status(400).json({ message: "Thiếu tháng cần tính" });

    const filter = childId ? { _id: childId } : {};
    const children = await Child.find(filter).populate("classId");
    if (!children || children.length === 0) return res.status(404).json({ message: "Không tìm thấy học sinh" });

    const results = [];
    const startDate = new Date(`${month}-01`);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    const formattedMonth = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;

    for (const child of children) {
      const classId = child.classId?._id;
      if (!classId) continue;

      const tuition = await Tuition.findOne({ classId });
      if (!tuition) continue;

      const attendance = await Attendance.find({
        childId: child._id,
        status: "Có mặt",
        date: { $gte: startDate, $lt: endDate },
      });
      const attendedDays = attendance.length;
      const mealFees = tuition.mealFeePerDay * attendedDays;

      const registrations = await ServiceRegistration.find({
        childId: child._id,
        createdAt: { $gte: startDate, $lt: endDate },
      }).populate("serviceId");

      const services = registrations
        .map((r) => ({
          serviceName: r.serviceId?.name || "",
          price: r.serviceId?.price || 0,
          sessionCount: r.serviceId?.sessionCount || null,
        }))
        .filter((s) =>
          s.serviceName &&
          s.serviceName.trim() !== "" &&
          s.serviceName.trim().toLowerCase() !== "không tên"
        );

      const serviceFees = services.reduce((sum, s) => sum + s.price, 0);

      const events = await Event.find({
        date: { $gte: startDate, $lt: endDate },
        eventHistory: {
          $elemMatch: {
            childId: child._id,
            status: "registered"
          }
        }
      });

      const eventItems = events.map((e) => ({
        eventName: e.title,
        fee: e.fee || 0,
      }));
      const eventFees = eventItems.reduce((sum, e) => sum + e.fee, 0);

      const total = tuition.monthlyFee + mealFees + serviceFees + eventFees;

      await MonthlyBill.deleteOne({ studentId: child._id, month: formattedMonth });

      const bill = new MonthlyBill({
        studentId: child._id,
        month: formattedMonth,
        classFee: tuition.monthlyFee,
        serviceFees,
        mealFees,
        eventFees,
        total,
        isPaid: false,
        markedByStudent: false,
        paymentMethod: null,
        details: {
          attendedDays,
          mealFeePerDay: tuition.mealFeePerDay,
          services,
          events: eventItems,
        },
      });

      await bill.save();
      results.push({ student: child.fullName, total });
    }

    res.status(201).json({
      message: `Đã tạo hóa đơn cho ${results.length} học sinh`,
      data: results,
    });
  } catch (err) {
    console.error("❌ Lỗi generateMonthlyBills:", err);
    res.status(500).json({ message: "Lỗi khi tạo hóa đơn", error: err.message });
  }
};

// Lấy danh sách hóa đơn theo tháng
export const getAllBillsByMonth = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Thiếu tháng cần xem" });

    const bills = await MonthlyBill.find({ month }).populate("studentId", "fullName");
    res.status(200).json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách hóa đơn", error: err.message });
  }
};

// Lấy hóa đơn theo học sinh
export const getBillsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const bills = await MonthlyBill.find({ studentId }).sort({ month: -1 });
    res.status(200).json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy hóa đơn học sinh", error: err.message });
  }
};

// Admin cập nhật trạng thái thanh toán
export const toggleBillPaidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid } = req.body;

    const updated = await MonthlyBill.findByIdAndUpdate(
      id,
      { isPaid, markedByStudent: false },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy hóa đơn" });
    res.status(200).json({ success: true, message: "Đã cập nhật trạng thái", bill: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};

// Học sinh xem hóa đơn của chính mình
export const getBillsForLoggedStudent = async (req, res) => {
  try {
    const studentId = req.childId;
    const bills = await MonthlyBill.find({ studentId }).sort({ month: -1 });
    res.status(200).json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy hóa đơn học sinh từ token", error: err.message });
  }
};

// Học sinh xác nhận đã thanh toán
export const markPaidByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    if (!req.childId) {
      return res.status(401).json({ success: false, message: "Thiếu thông tin học sinh từ token" });
    }

    const bill = await MonthlyBill.findById(id);
    if (!bill) return res.status(404).json({ success: false, message: "Không tìm thấy hóa đơn" });

    if (bill.studentId.toString() !== req.childId.toString()) {
      return res.status(403).json({ success: false, message: "Không có quyền xác nhận hóa đơn này" });
    }

    bill.markedByStudent = true;
    bill.paymentMethod = paymentMethod || null;

    // ✅ Thêm phần lưu ảnh nếu có file
    if (req.file) {
      bill.receiptImage = `/uploads/${req.file.filename}`;
    }

    await bill.save();

    res.status(200).json({ success: true, message: "Học sinh đã xác nhận thanh toán", bill });
  } catch (err) {
    console.error("❌ Lỗi markPaidByStudent:", err);
    res.status(500).json({ message: "Lỗi khi xác nhận thanh toán", error: err.message });
  }
};

// hóa đơn theo ID của bé
export const getBillsByChildId = async (req, res, next) => {
  const { childId } = req.params;
  try {
    const bills = await MonthlyBill.find({ studentId: new mongoose.Types.ObjectId(childId) }).sort({ month: -1 });
    res.json({ success: true, bills });
  } catch (err) {
    next(err);
  }
};
