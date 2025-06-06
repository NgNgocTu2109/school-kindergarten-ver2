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
                <BillTableHead>Sự kiện</BillTableHead>
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
                      <BillTableCell>{(bill.eventFees || 0).toLocaleString()} đ</BillTableCell>
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

                    {/* Chi tiết thanh toán */}
                    <BillTableCell colSpan="7" style={{ paddingTop: "16px" }}>
                      <div style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginTop: "10px",
                        width: "100%",
                      }}>
                        <div style={{
                          backgroundColor: "#f1f1f1",
                          padding: "12px 16px",
                          fontWeight: "bold",
                          fontSize: "16px",
                          borderBottom: "1px solid #ccc"
                        }}>
                          📋 Chi tiết thanh toán
                        </div>

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ background: "#f8f9fa" }}>
                              <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "left" }}>Hạng mục</th>
                              <th style={{ padding: "10px", border: "1px solid #ccc", textAlign: "left" }}>Chi tiết</th>
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

                            {/* Lọc dịch vụ có tên */}
                          {bill.details.services
                          ?.filter((svc) =>
                          svc.serviceName &&
                          svc.serviceName.trim() !== "" &&
                          svc.serviceName.trim().toLowerCase() !== "không tên"
                          )
                      .map((svc, idx) => (
                      <tr key={`svc-${idx}`}>
                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>Dịch vụ</td>
                        <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                      {svc.serviceName}
                      {svc.sessionCount ? ` (${svc.sessionCount} buổi)` : ""}
                        </td>
                        <td style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>
                      {svc.price.toLocaleString()} đ
                        </td>
                     </tr>
                          ))}

                            {bill.details.events?.map((evt, idx) => (
                              <tr key={`evt-${idx}`}>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>Sự kiện</td>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{evt.eventName}</td>
                                <td style={{ padding: "10px", border: "1px solid #ccc", textAlign: "right" }}>
                                  {evt.fee.toLocaleString()} đ
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </BillTableCell>
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
