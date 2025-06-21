import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  HistoryContainer,
  Content,
  HistoryContent,
  HistoryHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../../styles/StudentHistoryStyles';

const AdminStudentHistory = () => {
  const [searchName, setSearchName] = useState("");
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [services, setServices] = useState([]);
  const [bills, setBills] = useState([]);
  const [events, setEvents] = useState([]);

  const handleSearch = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/api/v1/children/search?name=${searchName}`);
    const found = res.data.children?.[0];
    if (!found) return alert("Không tìm thấy học sinh");

    const childId = found._id;
    const baseURL = "http://localhost:4000/api/v1";

    const [attRes, svcRes, billRes, evtRes] = await Promise.all([
      axios.get(`${baseURL}/attendance/child-history`, { params: { childId } }),
      axios.get(`${baseURL}/services/usage-history`, { params: { childId } }),
      axios.get(`${baseURL}/bill/child/${childId}`),
      axios.get(`${baseURL}/event/history`, { params: { childId } }),
    ]);

    // ✅ Xử lý lấy tên lớp đúng cách
    let className = "Không xác định";
    const classId = typeof found.classId === 'object' ? found.classId._id : found.classId;

    if (classId && typeof classId === 'string') {
      try {
        const classRes = await axios.get(`${baseURL}/class/${classId}`);
        className = classRes.data.class?.grade || "Không xác định";
      } catch (err) {
        console.warn("Không thể lấy thông tin lớp:", err?.response?.data || err.message);
      }
    }

    // ✅ Cập nhật state
    setStudent({ ...found, className });
    setAttendance(attRes.data.records || []);
    setServices(svcRes.data.history || []);
    setBills(billRes.data.bills || []);
    setEvents(evtRes.data.events || []);
  } catch (err) {
    console.error("❌ Lỗi chi tiết:", err.response?.data || err.message || err);
    alert("Không thể tải dữ liệu lịch sử. Vui lòng kiểm tra API backend.");
  }
};


  return (
    <HistoryContainer>
      <Sidebar />
      <Content>
        <HistoryContent>
          <HistoryHeader>📚 Quản lý lịch sử hoạt động học sinh</HistoryHeader>

          <div style={{ margin: '16px 0' }}>
            <input
              type="text"
              placeholder="Nhập tên học sinh"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ padding: '8px', width: '300px' }}
            />
            <button onClick={handleSearch} style={{ marginLeft: '12px', padding: '8px 16px' }}>
              Tìm kiếm
            </button>
          </div>

          {student && (
            <div>
              <h3>👤 Thông tin học sinh:</h3>
              <p><strong>Họ tên:</strong> {student.fullName}</p>
              <p><strong>Lớp:</strong> {student.className || '—'}</p>
              <p><strong>Ngày sinh:</strong> {student.birthday ? new Date(student.birthday).toLocaleDateString() : '—'}</p>

              <h4>📅 Lịch sử điểm danh:</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Ăn</TableCell>
                    <TableCell>Ngủ</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance.map((a, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>{a.eat}</TableCell>
                      <TableCell>{a.sleep}</TableCell>
                      <TableCell>{a.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h4>🧺 Dịch vụ đã dùng:</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dịch vụ</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((s, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{s.serviceName}</TableCell>
                      <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
                      <TableCell>{s.note || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h4>💰 Hóa đơn học phí:</h4>
                <Table>
                <TableHead>
                        <TableRow>
                    <TableCell>Tháng</TableCell>
                    <TableCell>Tổng tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                     </TableRow>
                </TableHead>
                <TableBody>
                    {bills.map((b, idx) => (
                <TableRow key={idx}>
                <TableCell>{b.month?.replace("-", "/")}</TableCell>
                <TableCell>{(b.total || 0).toLocaleString('vi-VN')}đ</TableCell>
                <TableCell>{b.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</TableCell>
                 </TableRow>
                ))}
                 </TableBody>
                </Table>

              <h4>🎈 Sự kiện đã tham gia:</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sự kiện</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Địa điểm</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((e, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{e.title}</TableCell>
                      <TableCell>{new Date(e.date).toLocaleDateString()}</TableCell>
                      <TableCell>{e.location || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </HistoryContent>
      </Content>
    </HistoryContainer>
  );
};

export default AdminStudentHistory;
