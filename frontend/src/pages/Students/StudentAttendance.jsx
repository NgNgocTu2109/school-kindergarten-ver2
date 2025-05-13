import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceForm,
  AttendanceSelect,
  AttendanceButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../../styles/AttendanceStyles';

const StudentAttendance = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(null);
  const [menu, setMenu] = useState(null);

  const handleSearch = async () => {
    if (!searchName.trim()) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children/search?name=${searchName}`);
      setSearchResults(res.data.children);
    } catch (err) {
      console.error('Lỗi tìm học sinh:', err);
    }
  };

  const fetchAttendance = async (childId, date) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/attendance/child/${childId}?date=${date}`);
      setAttendance(res.data.attendance);
    } catch (err) {
      console.error('Lỗi lấy điểm danh:', err);
    }
  };

  const fetchMenu = async (classId, date) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/menus?classId=${classId}&date=${date}`);
      setMenu(res.data.menu || null);
    } catch (err) {
      console.error('Lỗi lấy thực đơn:', err);
    }
  };

  useEffect(() => {
    if (selectedChild?._id && date) {
      fetchAttendance(selectedChild._id, date);
      const classId = selectedChild.classId?._id || selectedChild.classId;
      if (classId) {
        fetchMenu(classId, date);
      }
    }
  }, [selectedChild, date]);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Nhật ký bé {selectedChild?.fullName ? `– ${selectedChild.fullName}` : ""}
          </AttendanceHeader>

          <AttendanceForm>
            <input
              type="text"
              placeholder="Nhập tên bé"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <AttendanceButton onClick={handleSearch}>Tìm</AttendanceButton>

            {searchResults.length > 0 && (
              <AttendanceSelect
                onChange={(e) => {
                  const selected = searchResults.find(c => c._id === e.target.value);
                  setSelectedChild(selected);
                }}
              >
                <option value="">-- Chọn bé --</option>
                {searchResults.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.fullName} - Lớp {child.classId?.grade || ""}
                  </option>
                ))}
              </AttendanceSelect>
            )}

            <AttendanceSelect value={date} onChange={(e) => setDate(e.target.value)}>
              <option value={date}>{date}</option>
            </AttendanceSelect>
          </AttendanceForm>

          {/* --- Điểm danh --- */}
          <h4>Trạng thái điểm danh</h4>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ăn</TableCell>
                <TableCell>Ngủ</TableCell>
                <TableCell>Nhận xét</TableCell>
                <TableCell>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance ? (
                <TableRow>
                  <TableCell>{new Date(attendance.date).toLocaleDateString()}</TableCell>
                  <TableCell>{attendance.status}</TableCell>
                  <TableCell>{attendance.eat || "–"}</TableCell>
                  <TableCell>{attendance.sleep || "–"}</TableCell>
                  <TableCell>{attendance.comment || "–"}</TableCell>
                  <TableCell>{attendance.note || "–"}</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan="6">Chưa có dữ liệu điểm danh ngày này</TableCell>
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
