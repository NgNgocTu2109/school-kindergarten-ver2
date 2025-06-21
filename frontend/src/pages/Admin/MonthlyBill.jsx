// src/pages/Admin/MonthlyBill.jsx
// Import các thư viện cần thiết
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  BillContainer,
  BillContent,
  BillFormWrapper,
  BillTitle,
  BillMonthSelector,
  BillTable,
  BillTableHead,
  BillTableRow,
  BillTableCell,
  BillTableBody,
} from "../../styles/MonthlyBillStyles";

const MonthlyBill = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });

  const [childName, setChildName] = useState("");
  const [childId, setChildId] = useState(null);
  const [childInfo, setChildInfo] = useState(null);
  const [bills, setBills] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children/search?name=${childName}`);
      const children = res.data.children;
      const child = children?.[0];

      if (!child) {
        alert("Không tìm thấy học sinh");
        setChildId(null);
        setChildInfo(null);
        setBills([]);
        return;
      }

      setChildId(child._id);
      setChildInfo({
        fullName: child.fullName,
        className: child.classId?.grade || "---",
      });

      await fetchBillByStudent(child._id);
    } catch (err) {
      console.error("Lỗi tìm học sinh:", err);
    }
  };

  const handleGenerateBill = async () => {
    try {
      await axios.post(`http://localhost:4000/api/v1/bill/generate?month=${month}&childId=${childId}`);
      await fetchBillByStudent(childId);
      alert("Tính hóa đơn thành công!");
    } catch (err) {
      console.error("Lỗi tính hóa đơn:", err);
      alert("Tính hóa đơn thất bại!");
    }
  };

  const fetchBillByStudent = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/bill/student/${id}`);
       // ⚠️ Thêm dòng này để chỉ giữ hóa đơn đúng tháng
      const filtered = res.data.bills.filter((b) => b.month === month);
      setBills(filtered);
    } catch (err) {
      console.error("Lỗi lấy hóa đơn:", err);
    }
  };

  const handleStatusChange = async (billId, newValue) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/bill/${billId}/toggle-paid`, {
        isPaid: newValue === "true",
      });
      await fetchBillByStudent(childId);
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
    }
  };

  const getPaymentMethodLabel = (method) => {
    if (method === "cash") return "💵 Tiền mặt tại trường";
    if (method === "qr") return "🏦 Chuyển khoản QR";
    return "--";
  };

  const handlePrintInvoice = (bill) => {
    const win = window.open("", "_blank");
    const rows = [];

    rows.push(`<tr><td>Học phí</td><td>1</td><td>${bill.classFee.toLocaleString()} đ</td><td>${bill.classFee.toLocaleString()} đ</td></tr>`);
    rows.push(`<tr><td>Tiền ăn</td><td>${bill.details.attendedDays}</td><td>${bill.details.mealFeePerDay.toLocaleString()} đ</td><td>${bill.mealFees.toLocaleString()} đ</td></tr>`);

    bill.details.services?.forEach(svc => {
      const buoi = svc.sessionCount || 1;
      const gia = svc.price / buoi;
      rows.push(`<tr><td>${svc.serviceName}</td><td>${buoi}</td><td>${gia.toLocaleString()} đ</td><td>${svc.price.toLocaleString()} đ</td></tr>`);
    });

    bill.details.events?.forEach(evt => {
      rows.push(`<tr><td>${evt.eventName}</td><td>1</td><td>${evt.fee.toLocaleString()} đ</td><td>${evt.fee.toLocaleString()} đ</td></tr>`);
    });

    const html = `
      <html><head><title>Hóa đơn</title></head><body>
      <h2 style="text-align:center">TRƯỜNG MẦM NON BISTAR<br/>HÓA ĐƠN THANH TOÁN</h2>
      <p><strong>Mã hóa đơn:</strong> ${bill.billCode || "HD-" + bill._id.slice(-6).toUpperCase()}</p>
      <p><strong>Ngày:</strong> ${new Date().toLocaleDateString()}</p>
      <p><strong>Học sinh:</strong> ${childInfo?.fullName}</p>
      <p><strong>Lớp:</strong> ${childInfo?.className}</p>
      <p><strong>Phương thức thanh toán:</strong> ${getPaymentMethodLabel(bill.paymentMethod)}</p>

      <table border="1" cellspacing="0" cellpadding="6" width="100%" style="margin-top:20px; border-collapse: collapse;">
        <thead style="background:#f2f2f2"><tr><th>Mục</th><th>Buổi</th><th>Giá</th><th>Thành tiền</th></tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>

      <p style="text-align:right; font-weight:bold; margin-top:16px">TỔNG CỘNG: ${bill.total.toLocaleString()} đ</p>

      <p style="text-align:center; font-style:italic; margin-top:24px">
        Trạng thái: ${bill.isPaid ? "<b>Đã thanh toán</b>" : "<b>Chưa thanh toán</b>"}
      </p>

      <p style="text-align:center; margin-top:16px">
        Cảm ơn quý phụ huynh!
      </p>
      </body></html>
    `;

    win.document.write(html);
    win.document.close();
    win.print();
  };

  return (
    <BillContainer>
      <Sidebar />
      <BillContent>
        <BillFormWrapper>
          <BillTitle>Hóa đơn tháng của học sinh</BillTitle>

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Nhập tên học sinh"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              style={{ padding: "6px", marginRight: "10px", width: "220px" }}
            />
            <button
              onClick={handleSearch}
              style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
            >
              Tìm
            </button>
          </div>
          {childId && (
            <>
              <BillMonthSelector
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <button
                onClick={handleGenerateBill}
                style={{
                  marginLeft: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              >
                Tính hóa đơn tháng
              </button>
            </>
          )}
          <BillTable>
            <thead>
              <BillTableRow>
                <BillTableHead>Tháng</BillTableHead>
                <BillTableHead>Học phí</BillTableHead>
                <BillTableHead>Dịch vụ</BillTableHead>
                <BillTableHead>Tiền ăn</BillTableHead>
                <BillTableHead>Sự kiện</BillTableHead>
                <BillTableHead>Tổng cộng</BillTableHead>
                <BillTableHead>Phương thức</BillTableHead>
                <BillTableHead>Ảnh biên nhận</BillTableHead> 
                <BillTableHead>Trạng thái</BillTableHead>
              </BillTableRow>
            </thead>
            <BillTableBody>
              {bills.map((bill) => (
                <React.Fragment key={bill._id}>
                  <BillTableRow>
                    <BillTableCell>{bill.month}</BillTableCell>
                    <BillTableCell>{bill.classFee.toLocaleString()} đ</BillTableCell>
                    <BillTableCell>{bill.serviceFees.toLocaleString()} đ</BillTableCell>
                    <BillTableCell>{bill.mealFees.toLocaleString()} đ</BillTableCell>
                    <BillTableCell>{(bill.eventFees || 0).toLocaleString()} đ</BillTableCell>
                    <BillTableCell style={{ fontWeight: "bold", color: "red" }}>
                      {bill.total.toLocaleString()} đ
                    </BillTableCell>
                    <BillTableCell>{getPaymentMethodLabel(bill.paymentMethod)}</BillTableCell>
                    <BillTableCell>
                    {bill.receiptImage ? (
                    <a
                    href={`http://localhost:4000${bill.receiptImage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                <img
                src={`http://localhost:4000${bill.receiptImage}`}
                alt="biên nhận"
                style={{ height: "40px", borderRadius: "4px" }}
                />
                </a>
                ) : "—"}
                </BillTableCell>
                    <BillTableCell>
                      {bill.markedByStudent && !bill.isPaid ? (
                        <>
                          ⚠️ Cần duyệt<br />
                          <button onClick={() => handleStatusChange(bill._id, "true")}>Duyệt</button>
                        </>
                      ) : (
                        <select
                          value={bill.isPaid ? "true" : "false"}
                          onChange={(e) => handleStatusChange(bill._id, e.target.value)}
                          style={{ padding: "6px", borderRadius: "4px" }}
                        >
                          <option value="false">Chưa thanh toán</option>
                          <option value="true">Đã thanh toán</option>
                        </select>
                      )}
                    </BillTableCell>
                  </BillTableRow>
                  <BillTableRow>
                    <BillTableCell colSpan="9">
                      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse", border: "1px solid #ccc" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#f1f1f1" }}>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Hạng mục</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Chi tiết</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>Số tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>Tiền ăn</td>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                              {bill.details.attendedDays} ngày × {bill.details.mealFeePerDay.toLocaleString()} đ
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>
                              {bill.mealFees.toLocaleString()} đ
                            </td>
                          </tr>
                          {bill.details.services?.map((svc, idx) => (
                            <tr key={idx}>
                              <td style={{ padding: "10px", border: "1px solid #ccc" }}>Dịch vụ</td>
                              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                {svc.serviceName}{svc.sessionCount ? ` (${svc.sessionCount} buổi)` : ""}
                              </td>
                              <td style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>
                                {svc.price.toLocaleString()} đ
                              </td>
                            </tr>
                          ))}
                          {bill.details.events?.map((evt, idx) => (
                            <tr key={idx}>
                              <td style={{ padding: "10px", border: "1px solid #ccc" }}>Sự kiện</td>
                              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{evt.eventName}</td>
                              <td style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>
                                {evt.fee.toLocaleString()} đ
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div style={{ textAlign: "center", marginTop: "16px" }}>
                        <button onClick={() => handlePrintInvoice(bill)}>🖨️ In hóa đơn</button>
                      </div>
                    </BillTableCell>
                  </BillTableRow>
                </React.Fragment>
              ))}
            </BillTableBody>
          </BillTable>
        </BillFormWrapper>
      </BillContent>
    </BillContainer>
  );
};

export default MonthlyBill;
