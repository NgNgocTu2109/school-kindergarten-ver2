// ✅ MonthlyBill.jsx: Dùng dropdown để chọn trạng thái thanh toán

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
  const [bills, setBills] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children/search?name=${childName}`);
      const children = res.data.children;
      const child = children?.[0];

      if (!child) {
        alert("Không tìm thấy học sinh");
        setChildId(null);
        setBills([]);
        return;
      }

      setChildId(child._id);
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
      setBills(res.data.bills);
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
                <BillTableHead>Tổng cộng</BillTableHead>
                <BillTableHead>Trạng thái</BillTableHead>
              </BillTableRow>
            </thead>
            <BillTableBody>
              {bills.length === 0 ? (
                <BillTableRow>
                  <BillTableCell colSpan="6">Chưa có dữ liệu hóa đơn cho học sinh này.</BillTableCell>
                </BillTableRow>
              ) : (
                bills.map((bill) => (
                  <React.Fragment key={bill._id}>
                    <BillTableRow>
                      <BillTableCell>{bill.month}</BillTableCell>
                      <BillTableCell>{bill.classFee.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{bill.serviceFees.toLocaleString()} đ</BillTableCell>
                      <BillTableCell>{bill.mealFees.toLocaleString()} đ</BillTableCell>
                      <BillTableCell style={{ fontWeight: "bold", color: "red" }}>
                        {bill.total.toLocaleString()} đ
                      </BillTableCell>
                      <BillTableCell>
                        <select
                          value={bill.isPaid ? "true" : "false"}
                          onChange={(e) => handleStatusChange(bill._id, e.target.value)}
                          style={{ padding: "6px", borderRadius: "4px" }}
                        >
                          <option value="false">Chưa thanh toán</option>
                          <option value="true">Đã thanh toán</option>
                        </select>
                      </BillTableCell>
                    </BillTableRow>

                    <BillTableRow>
                      <BillTableCell colSpan="6">
                        <div style={{ background: "#f0f2f5", padding: "12px 20px", borderRadius: "8px", margin: "8px 0" }}>
                          <div style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "8px" }}>
                            📋 Chi tiết thanh toán:
                          </div>
                          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                            🍱 <strong>Tiền ăn:</strong> {bill.details.attendedDays} ngày × {bill.details.mealFeePerDay.toLocaleString()} đ = {bill.mealFees.toLocaleString()} đ
                          </div>
                          {bill.details.services.length > 0 && (
                            <div style={{ fontSize: "14px", marginTop: "6px" }}>
                              🛎 <strong>Dịch vụ đã đăng ký:</strong>
                              <div style={{ marginLeft: "16px", marginTop: "4px" }}>
                                {bill.details.services.map((svc, idx) => (
                                  <div key={idx} style={{ marginBottom: "2px" }}>
                                    • {svc.serviceName}: {svc.price.toLocaleString()} đ
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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

export default MonthlyBill;
