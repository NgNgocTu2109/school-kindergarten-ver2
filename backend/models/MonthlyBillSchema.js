  // Nhập thư viện mongoose để làm việc với MongoDB
  import mongoose from "mongoose";

  // Định nghĩa schema cho bảng MonthlyBill - Hóa đơn hàng tháng
  const monthlyBillSchema = new mongoose.Schema({
    // Liên kết tới học sinh tương ứng thông qua ObjectId
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    // Tháng của hóa đơn, định dạng "YYYY-MM"
    month: {
      type: String,
      required: true,
    },

    // Học phí lớp học (theo khối/lớp)
    classFee: Number,

    // Tổng phí dịch vụ đã đăng ký
    serviceFees: Number,

    // Tổng tiền ăn (số buổi ăn x đơn giá)
    mealFees: Number,

    // Tổng phí tham gia sự kiện
    eventFees: Number,

    // Tổng cộng tất cả các khoản
    total: Number,

    // Trạng thái đã thanh toán (do admin xác nhận)
    isPaid: {
      type: Boolean,
      default: false,
    },

    // Học sinh đã đánh dấu là đã thanh toán (chờ admin duyệt)
    markedByStudent: {
      type: Boolean,
      default: false,
    },

    // Phương thức thanh toán: "cash" (tiền mặt) hoặc "qr" (chuyển khoản qua mã QR)
    paymentMethod: {
      type: String,
      enum: ["cash", "qr", null], // ✅ rõ ràng, dễ hiểu
      default: null,
    },
     // ✅ Ảnh minh chứng chuyển khoản do phụ huynh upload
  receiptImage: {
    type: String,
    default: null,
  },

    // Chi tiết bổ sung của hóa đơn
    details: {
      // Số ngày đi học trong tháng
      attendedDays: Number,

      // Đơn giá tiền ăn mỗi ngày
      mealFeePerDay: Number,

      // Danh sách dịch vụ đăng ký
      services: [
        {
          serviceName: String,
          price: Number,
          sessionCount: Number,
        },
      ],

      // Danh sách sự kiện tham gia
      events: [
        {
          eventName: String,
          fee: Number,
        },
      ],
    },
  }, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  });

  // Phương thức: admin xác nhận đã thanh toán
  monthlyBillSchema.methods.markAsPaidByAdmin = function () {
    this.isPaid = true;
    this.markedByStudent = false;
    return this.save();
  };

  // Export model
  export const MonthlyBill = mongoose.model("MonthlyBill", monthlyBillSchema);
