// src/pages/admin/Statistics.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StatisticsContainer,
  Content,
  Section,
  SectionTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '../../styles/StatisticsStyles';

const Statistics = () => {
  const [classCounts, setClassCounts] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [healthStatus, setHealthStatus] = useState([]);

  const [newClass, setNewClass] = useState({ className: '', studentCount: 0 });
  const [newAttendance, setNewAttendance] = useState({ month: '', attendanceRate: 0, absentRate: 0 });
  const [newHealth, setNewHealth] = useState({ name: '', className: '', healthStatus: '' });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const classResponse = await axios.get('http://localhost:4000/api/v1/statistics/classes');
      const attendanceResponse = await axios.get('http://localhost:4000/api/v1/statistics/attendance');
      const healthResponse = await axios.get('http://localhost:4000/api/v1/statistics/health');

      setClassCounts(classResponse.data.classes || []);
      setAttendanceStats(attendanceResponse.data.attendanceStats || []);

      const healthData = healthResponse.data.healthStats || [];
      console.log("✅ Health data from backend:", healthResponse.data);

      // Kiểm tra và xử lý nếu healthStatus là object có field status
      const normalizedHealth = healthData.map(item => ({
        name: item.name || '',
        className: item.className || '',
        healthStatus: typeof item.healthStatus === 'object' ? item.healthStatus.status : item.healthStatus
      }));

      setHealthStatus(normalizedHealth);
    } catch (error) {
      console.error('❌ Lỗi khi tải dữ liệu thống kê:', error);
      toast.error('Không thể tải dữ liệu thống kê.');
    }
  };

  const handleAddClass = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/statistics/classes", newClass);
      toast.success("Thêm lớp thành công!");
      setNewClass({ className: "", studentCount: 0 });
      fetchStatistics();
    } catch (error) {
      console.error("❌ Lỗi khi thêm lớp:", error);
      toast.error("Không thể thêm lớp.");
    }
  };

  const handleAddAttendance = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/statistics/attendance", newAttendance);
      toast.success("Thêm thống kê điểm danh thành công!");
      setNewAttendance({ month: "", attendanceRate: 0, absentRate: 0 });
      fetchStatistics();
    } catch (error) {
      console.error("❌ Lỗi khi thêm thống kê:", error);
      toast.error("Không thể thêm thống kê.");
    }
  };

  const handleAddHealth = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/statistics/health", newHealth);
      toast.success("Thêm dữ liệu sức khỏe thành công!");
      setNewHealth({ name: "", className: "", healthStatus: "" });
      fetchStatistics();  // Tải lại dữ liệu sau khi thêm thành công
    } catch (error) {
      console.error("❌ Lỗi khi thêm sức khỏe:", error);
      toast.error("Không thể thêm thông tin sức khỏe.");
    }
  };
  

  return (
    <StatisticsContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        {/* Sĩ số lớp */}
        <Section>
          <SectionTitle>Báo cáo sĩ số lớp học</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên lớp</TableCell>
                <TableCell>Sĩ số</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(classCounts) && classCounts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.studentCount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>
                  <input
                    value={newClass.className}
                    onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                    placeholder="Tên lớp"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={newClass.studentCount}
                    onChange={(e) => setNewClass({ ...newClass, studentCount: e.target.value })}
                    placeholder="Sĩ số"
                  />
                </TableCell>
                <TableCell>
                  <button onClick={handleAddClass}>Thêm</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Thống kê đi học/vắng mặt */}
        <Section>
          <SectionTitle>Thống kê tỷ lệ đi học/vắng mặt theo tháng</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng</TableCell>
                <TableCell>Tỷ lệ đi học</TableCell>
                <TableCell>Tỷ lệ vắng mặt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(attendanceStats) && attendanceStats.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.attendanceRate}%</TableCell>
                  <TableCell>{item.absentRate}%</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <input
                    value={newAttendance.month}
                    onChange={(e) => setNewAttendance({ ...newAttendance, month: e.target.value })}
                    placeholder="Tháng"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={newAttendance.attendanceRate}
                    onChange={(e) => setNewAttendance({ ...newAttendance, attendanceRate: e.target.value })}
                    placeholder="Đi học (%)"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={newAttendance.absentRate}
                    onChange={(e) => setNewAttendance({ ...newAttendance, absentRate: e.target.value })}
                    placeholder="Vắng (%)"
                  />
                </TableCell>
                <TableCell>
                  <button onClick={handleAddAttendance}>Thêm</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* Tình trạng sức khỏe */}
        <Section>
          <SectionTitle>Tổng hợp tình trạng sức khỏe của trẻ</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Tình trạng sức khỏe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(healthStatus) && healthStatus.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.healthStatus}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <input
                    value={newHealth.name}
                    onChange={(e) => setNewHealth({ ...newHealth, name: e.target.value })}
                    placeholder="Họ tên"
                  />
                </TableCell>
                <TableCell>
                  <input
                    value={newHealth.className}
                    onChange={(e) => setNewHealth({ ...newHealth, className: e.target.value })}
                    placeholder="Lớp"
                  />
                </TableCell>
                <TableCell>
                  <input
                    value={newHealth.healthStatus}
                    onChange={(e) => setNewHealth({ ...newHealth, healthStatus: e.target.value })}
                    placeholder="Tình trạng"
                  />
                </TableCell>
                <TableCell>
                  <button onClick={handleAddHealth}>Thêm</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </Content>
    </StatisticsContainer>
  );
};

export default Statistics;
