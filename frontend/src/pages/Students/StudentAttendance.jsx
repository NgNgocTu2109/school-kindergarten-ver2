import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceSelect,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../../styles/AttendanceStyles';

const StudentAttendance = () => {
  // Lấy từ localStorage studentUser thay vì dùng key riêng
  const studentUser = JSON.parse(localStorage.getItem("studentUser"));
  const childId = studentUser?.childId || "";
  const childName = studentUser?.fullName || "";

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(null);
  const [menu, setMenu] = useState(null);

  const fetchDiary = async () => {
    try {
      if (!childId || !date) return;

      const res = await axios.get(`http://localhost:4000/api/v1/attendance/diary/${childId}?date=${date}`);
      setAttendance(res.data.attendance || null);
      setMenu(res.data.menu || null);
    } catch (err) {
      console.error('Lỗi lấy nhật ký bé:', err);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [date]);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Nhật ký của bé {childName ? `– ${childName}` : ""}
          </AttendanceHeader>

          {/* Chọn ngày */}
          <AttendanceSelect value={date} onChange={(e) => setDate(e.target.value)}>
            <option value={date}>{date}</option>
          </AttendanceSelect>

          {/* --- Điểm danh --- */}
          <h4 style={{ marginTop: "20px" }}>Trạng thái điểm danh</h4>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ăn</TableCell>
                <TableCell>Ngủ</TableCell>
                <TableCell>Nhận xét</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Ảnh minh chứng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance ? (
                <TableRow>
                  <TableCell>{new Date(attendance.date).toLocaleDateString()}</TableCell>
                  <TableCell>{attendance.status}</TableCell>
                  <TableCell>{attendance.eat || "-"}</TableCell>
                  <TableCell>{attendance.sleep || "-"}</TableCell>
                  <TableCell>{attendance.comment || "-"}</TableCell>
                  <TableCell>{attendance.note || "-"}</TableCell>
                  <TableCell>
                    {attendance.imageUrl ? (
                      <img
                        src={`http://localhost:4000/uploads/${attendance.imageUrl}`}
                        alt="Ảnh điểm danh"
                        style={{ width: "100px", borderRadius: "6px" }}
                      />
                    ) : (
                      <span style={{ color: "#888" }}>Không có ảnh</span>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan="7">Chưa có dữ liệu điểm danh ngày này</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* --- Thực đơn --- */}
          <h4 style={{ marginTop: "40px" }}>Thực đơn của bé</h4>
          {menu ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Bữa sáng</TableCell>
                  <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Bữa trưa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>
                    <img src={menu.breakfast.imageUrl} alt={menu.breakfast.name} style={{ width: "100%", maxWidth: "120px", borderRadius: "8px" }} /><br />
                    <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "6px" }}>{menu.breakfast.name}</div>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <img src={menu.lunch.imageUrl} alt={menu.lunch.name} style={{ width: "100%", maxWidth: "120px", borderRadius: "8px" }} /><br />
                    <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "6px" }}>{menu.lunch.name}</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p>Chưa có thực đơn cho ngày này.</p>
          )}
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default StudentAttendance;
