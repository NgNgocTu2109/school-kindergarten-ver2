import { Attendance } from "../models/attendanceSchema.js";
import { Tuition } from "../models/TuitionSchema.js";
import { Child } from "../models/childSchema.js"; 
import { ServiceRegistration } from "../models/registrationSchema.js";
import { Service } from "../models/serviceSchema.js";
import { MonthlyBill } from "../models/MonthlyBillSchema.js";

export const generateMonthlyBills = async (req, res) => {
  try {
    const { month, childId } = req.query;
    if (!month) return res.status(400).json({ message: "Thiếu tháng cần tính" });

    const filter = childId ? { _id: childId } : {};
    const children = await Child.find(filter).populate("classId");

    if (!children || children.length === 0) {
      console.log("[DEBUG] Không tìm thấy học sinh");
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }

    const results = [];
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    const formattedMonth = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;

    for (const child of children) {
      console.log(`\n🔍 [DEBUG] Xử lý học sinh: ${child.fullName}`);

      const classId = child.classId?._id;
      if (!classId) {
        console.log("⚠️ BỎ QUA: Không có classId");
        continue;
      }

      const tuition = await Tuition.findOne({ classId });
      if (!tuition) {
        console.log("⚠️ BỎ QUA: Không tìm thấy học phí cho lớp", classId);
        continue;
      }

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

      const services = registrations.map((r) => ({
        serviceName: r.serviceId?.name || "(Không tên)",
        price: r.serviceId?.price || 0,
      }));

      const serviceFees = services.reduce((sum, s) => sum + s.price, 0);
      const total = tuition.monthlyFee + mealFees + serviceFees;

      console.log("[DEBUG] Tổng kết:");
      console.log("➡️ Số ngày đi học:", attendedDays);
      console.log("➡️ Học phí:", tuition.monthlyFee);
      console.log("➡️ Tiền ăn:", mealFees);
      console.log("➡️ Dịch vụ:", services);
      console.log("➡️ Tổng cộng:", total);

      // Xóa hóa đơn cũ nếu có
      await MonthlyBill.deleteOne({ studentId: child._id, month: formattedMonth });

      const bill = new MonthlyBill({
        studentId: child._id,
        month: formattedMonth,
        classFee: tuition.monthlyFee,
        serviceFees,
        mealFees,
        total,
        isPaid: false, // ✅ Thêm trạng thái mặc định
        details: {
          attendedDays,
          mealFeePerDay: tuition.mealFeePerDay,
          services,
        },
      });

      await bill.save();
      console.log("✅ Đã lưu hóa đơn!");
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

// [1] Lấy danh sách hóa đơn toàn bộ theo tháng (Admin)
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

// [2] Lấy hóa đơn của một trẻ (cho phụ huynh)
export const getBillsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const bills = await MonthlyBill.find({ studentId }).sort({ month: -1 });

    res.status(200).json({ success: true, bills });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy hóa đơn học sinh", error: err.message });
  }
};

// Cập nhật trạng thái thanh toán
export const toggleBillPaidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid } = req.body;

    const updated = await MonthlyBill.findByIdAndUpdate(
      id,
      { isPaid },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy hóa đơn" });

    res.status(200).json({ success: true, message: "Đã cập nhật trạng thái", bill: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};
