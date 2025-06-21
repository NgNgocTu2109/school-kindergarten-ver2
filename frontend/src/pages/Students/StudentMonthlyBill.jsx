// Import thư viện
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BillContainer,
  BillContent,
  BillFormWrapper,
  BillTitle,
  BillTable,
  BillTableHead,
  BillTableRow,
  BillTableCell,
  BillTableBody,
} from "../../styles/MonthlyBillStyles";

const StudentMonthlyBill = () => {
  const [bills, setBills] = useState([]);
  const [childInfo, setChildInfo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });

  const token = localStorage.getItem("studentToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBill = await axios.get("http://localhost:4000/api/v1/bill/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(resBill.data.bills || []);

        const resInfo = await axios.get("http://localhost:4000/api/v1/studentaccount/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const child = resInfo.data.child;
        setChildInfo({
          fullName: child.fullName,
          className: child.classId?.grade || "---",
        });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setBills([]);
      }
    };

    if (token) fetchData();
  }, [token]);

  const goToPayment = (billId) => {
    navigate(`/student/payment/${billId}`);
  };

  const getPaymentMethodLabel = (method) => {
    if (method === "cash") return "\ud83d\udcb5 Tiền mặt tại trường";
    if (method === "qr") return "\ud83c\udfe6 Chuyển khoản QR";
    return "--";
  };

  const handlePrintInvoice = (bill) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const serviceRows = bill.details.services?.map((svc) => {
      const buoi = svc.sessionCount || 1;
      const gia = svc.price / buoi;
      return `
        <tr>
          <td style="border: 1px solid #000; padding: 6px;">${svc.serviceName}</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: center;">${buoi}</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: right;">${gia.toLocaleString()} đ</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: right;">${svc.price.toLocaleString()} đ</td>
        </tr>`;
    }).join("") || "";

    const eventRows = bill.details.events?.map((evt) => {
      return `
        <tr>
          <td style="border: 1px solid #000; padding: 6px;">${evt.eventName}</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: center;">1</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: right;">${evt.fee.toLocaleString()} đ</td>
          <td style="border: 1px solid #000; padding: 6px; text-align: right;">${evt.fee.toLocaleString()} đ</td>
        </tr>`;
    }).join("") || "";

    const content = `
      <html>
      <head>
        <title>Hóa đơn ${bill.month}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; font-size: 16px; }
          h2, h3 { text-align: center; margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; }
          th { background-color: #f0f0f0; }
          .total { text-align: right; font-weight: bold; margin-top: 20px; }
          .center { text-align: center; margin-top: 40px; }
        </style>
      </head>
      <body>
        <h2>TRƯỜNG MẦM NON BISTAR</h2>
        <h3>HÓA ĐƠN THANH TOÁN</h3>

        <p><strong>Mã hóa đơn:</strong> HD-${bill.month.replace("-", "")}</p>
        <p><strong>Ngày:</strong> ${new Date().toLocaleDateString("vi-VN")}</p>
        <p><strong>Học sinh:</strong> ${childInfo?.fullName || "---"}</p>
        <p><strong>Lớp:</strong> ${childInfo?.className || "---"}</p>
        <p><strong>Hình thức thanh toán:</strong> ${getPaymentMethodLabel(bill.paymentMethod)}</p>

        <table>
          <thead>
            <tr>
              <th>Mục</th>
              <th>Buổi</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Học phí</td>
              <td style="text-align: center;">1</td>
              <td style="text-align: right;">${bill.classFee.toLocaleString()} đ</td>
              <td style="text-align: right;">${bill.classFee.toLocaleString()} đ</td>
            </tr>
            <tr>
              <td>Tiền ăn</td>
              <td style="text-align: center;">${bill.details.attendedDays}</td>
              <td style="text-align: right;">${bill.details.mealFeePerDay.toLocaleString()} đ</td>
              <td style="text-align: right;">${bill.mealFees.toLocaleString()} đ</td>
            </tr>
            ${serviceRows}
            ${eventRows}
          </tbody>
        </table>

        <p class="total">TỔNG CỘNG: ${bill.total.toLocaleString()} đ</p>
        <p class="total">Trạng thái: ${bill.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        <p class="center">Cảm ơn quý phụ huynh!</p>
      </body>
      </html>
    `;

    newWindow.document.write(content);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  return (
    <BillContainer>
      <Sidebar />
      <BillContent>
        <BillFormWrapper>
          <BillTitle>Hóa đơn của bé</BillTitle>

          <div style={{ marginBottom: "16px" }}>
            <label><strong>Chọn tháng:</strong></label>{" "}
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ padding: "6px", marginLeft: "8px" }}
            />
          </div>

          <BillTable>
            <thead>
              <BillTableRow>
                <BillTableHead>Tháng</BillTableHead>
                <BillTableHead>Học phí</BillTableHead>
                <BillTableHead>Dịch vụ</BillTableHead>
                <BillTableHead>Tiền ăn</BillTableHead>
                <BillTableHead>Sự kiện</BillTableHead>
                <BillTableHead>Tổng cộng</BillTableHead>
                <BillTableHead>Trạng thái</BillTableHead>
              </BillTableRow>
            </thead>
            <BillTableBody>
              {bills.filter((b) => b.month === selectedMonth).length === 0 ? (
                <BillTableRow>
                  <BillTableCell colSpan="7">Không có hóa đơn cho tháng này.</BillTableCell>
                </BillTableRow>
              ) : (
                bills.filter((b) => b.month === selectedMonth).map((bill) => (
                  <React.Fragment key={bill._id}>
                    <BillTableRow>
                      <BillTableCell>{bill.month}</BillTableCell>
                      <BillTableCell>{bill.classFee.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{bill.serviceFees.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{bill.mealFees.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{(bill.eventFees || 0).toLocaleString()} đ</BillTableCell>
                      <BillTableCell style={{ fontWeight: "bold", color: "red" }}>{bill.total.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{bill.isPaid ? "Đã thanh toán" : bill.markedByStudent ? "⏳ Chờ xác nhận" : "Chưa thanh toán"}</BillTableCell>
                    </BillTableRow>

                    <BillTableRow>
                      <BillTableCell colSpan="7">
                        <div style={{ marginTop: "12px" }}>
                          <h4 style={{ fontWeight: "bold", marginBottom: "12px" }}>📋 Chi tiết thanh toán</h4>
                          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fdfdfd" }}>
                            <thead>
                              <tr style={{ background: "#e9ecef" }}>
                                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Hạng mục</th>
                                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Chi tiết</th>
                                <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>Số tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>Tiền ăn</td>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{bill.details.attendedDays} ngày × {bill.details.mealFeePerDay.toLocaleString()} đ</td>
                                <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>{bill.mealFees.toLocaleString()} đ</td>
                              </tr>
                              {bill.details.services?.map((svc, idx) => (
                                <tr key={`svc-${idx}`}>
                                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Dịch vụ</td>
                                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{svc.serviceName}{svc.sessionCount ? ` (${svc.sessionCount} buổi)` : ""}</td>
                                  <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>{svc.price.toLocaleString()} đ</td>
                                </tr>
                              ))}
                              {bill.details.events?.map((evt, idx) => (
                                <tr key={`evt-${idx}`}>
                                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>Sự kiện</td>
                                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>{evt.eventName}</td>
                                  <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>{evt.fee.toLocaleString()} đ</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <button onClick={() => goToPayment(bill._id)}>💰 Thanh toán</button>
                            <button onClick={() => handlePrintInvoice(bill)}>🖨️ In hóa đơn</button>
                          </div>
                        </div>
                      </BillTableCell>
                    </BillTableRow>
                  </React.Fragment>
                ))
              )}
            </BillTableBody>
          </BillTable>
        </BillFormWrapper>
      </BillContent>
    </BillContainer>
  );
};

export default StudentMonthlyBill;
