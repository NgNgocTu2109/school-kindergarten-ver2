// src/pages/Students/StudentMonthlyBill.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
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
  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    const fetchBills = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:4000/api/v1/bill/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(res.data.bills || []);
      } catch (err) {
        console.error("Lỗi lấy hóa đơn:", err);
        setBills([]);
      }
    };

    fetchBills();
  }, [token]);

  return (
    <BillContainer>
      <Sidebar />
      <BillContent>
        <BillFormWrapper>
          <BillTitle>Hóa đơn của bé</BillTitle>

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
              {bills.length === 0 ? (
                <BillTableRow>
                  <BillTableCell colSpan="7">Chưa có dữ liệu hóa đơn cho học sinh này.</BillTableCell>
                </BillTableRow>
              ) : (
                bills.map((bill) => (
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
                      <BillTableCell style={{ color: bill.isPaid ? "green" : "orange" }}>
                        {bill.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </BillTableCell>
                    </BillTableRow>

                    <BillTableRow>
                      <BillTableCell colSpan="7" style={{ paddingTop: "16px" }}>
                        <h4 style={{ margin: "10px 0", fontWeight: "bold" }}>📋 Chi tiết thanh toán</h4>
                        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fdfdfd" }}>
                          <thead>
                            <tr style={{ background: "#e9ecef" }}>
                              <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "left" }}>Hạng mục</th>
                              <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "left" }}>Chi tiết</th>
                              <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>Số tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ padding: "8px", border: "1px solid #ccc" }}>Tiền ăn</td>
                              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                                {bill.details.attendedDays} ngày × {bill.details.mealFeePerDay.toLocaleString()} đ
                              </td>
                              <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>
                                {bill.mealFees.toLocaleString()} đ
                              </td>
                            </tr>
                            {bill.details.services?.map((svc, idx) => (
                              <tr key={`svc-${idx}`}>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>Dịch vụ</td>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                                  {svc.serviceName}
                                  {svc.sessionCount ? ` (${svc.sessionCount} buổi)` : ""}
                                </td>
                                <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>
                                  {svc.price.toLocaleString()} đ
                                </td>
                              </tr>
                            ))}
                            {bill.details.events?.map((evt, idx) => (
                              <tr key={`evt-${idx}`}>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>Sự kiện</td>
                                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{evt.eventName}</td>
                                <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>
                                  {evt.fee.toLocaleString()} đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
