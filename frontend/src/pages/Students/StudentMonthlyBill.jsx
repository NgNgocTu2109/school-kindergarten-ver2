// ✅ StudentMonthlyBill: Thêm trạng thái thanh toán (đã/chưa) vào bảng hóa đơn

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
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

const StudentMonthlyBill = () => {
  const [childName, setChildName] = useState("");
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [bills, setBills] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children/search?name=${childName}`);
      const children = res.data.children;
      const child = children?.[0];

      if (!child || !child._id) {
        alert("Không tìm thấy học sinh!");
        setBills([]);
        return;
      }

      const billRes = await axios.get(`http://localhost:4000/api/v1/bill/student/${child._id}`);
      setBills(billRes.data.bills);
    } catch (err) {
      console.error("Lỗi tìm kiếm hoặc lấy hóa đơn:", err);
      alert("Không tìm thấy dữ liệu phù hợp.");
    }
  };

  return (
    <BillContainer>
      <Sidebar />
      <BillContent>
        <BillFormWrapper>
          <BillTitle>Hóa đơn của bé</BillTitle>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Nhập tên bé"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              style={{ padding: "6px", marginRight: "10px", width: "200px" }}
            />
            <button
              onClick={handleSearch}
              style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
            >
              Tìm
            </button>
          </div>

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
                  <BillTableRow key={bill._id}>
                    <BillTableCell>{bill.month}</BillTableCell>
                    <BillTableCell>{bill.classFee.toLocaleString()} đ</BillTableCell>
                    <BillTableCell>{bill.serviceFees.toLocaleString()} đ</BillTableCell>
                    <BillTableCell>{bill.mealFees.toLocaleString()} đ</BillTableCell>
                    <BillTableCell style={{ fontWeight: "bold", color: "red" }}>
                      {bill.total.toLocaleString()} đ
                    </BillTableCell>
                    <BillTableCell style={{ color: bill.isPaid ? "green" : "orange" }}>
                      {bill.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </BillTableCell>
                  </BillTableRow>
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
