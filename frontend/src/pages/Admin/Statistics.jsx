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
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = () => {
  const [overview, setOverview] = useState(null);
  const [classNames, setClassNames] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchStatistics();
    fetchClassNames();
  }, []);

  const fetchStatistics = async () => {
    try {
      const overviewRes = await axios.get('http://localhost:4000/api/v1/statistics/overview');
      setOverview(overviewRes.data);
    } catch (error) {
      console.error('❌ Lỗi khi tải dữ liệu thống kê:', error);
      toast.error('Không thể tải dữ liệu thống kê.');
    }
  };

  const fetchClassNames = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/class/getall');
      const map = {};
      res.data.classes.forEach(cls => {
        map[cls._id] = cls.className;
      });
      setClassNames(map);
    } catch (error) {
      console.error("❌ Lỗi lấy tên lớp:", error);
    }
  };

  const filteredAttendance = overview?.attendanceSummary?.filter(item =>
    !selectedMonth || item.month === selectedMonth
  );

  return (
    <StatisticsContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        {/* Tổng quan dịch vụ */}
        <Section>
          <SectionTitle>Thống kê dịch vụ</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên dịch vụ</TableCell>
                <TableCell>Số học sinh đăng ký</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overview?.serviceStats?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.totalRegistered}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* Tổng quan sự kiện */}
        <Section>
          <SectionTitle>Thống kê sự kiện</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sự kiện</TableCell>
                <TableCell>Số học sinh tham gia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overview?.eventStats?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.totalParticipants}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* Thống kê điểm danh - lọc + biểu đồ */}
        <Section>
          <SectionTitle>Tỷ lệ điểm danh theo tháng</SectionTitle>

          <div style={{ marginBottom: '10px' }}>
            <label>Chọn tháng: </label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">-- Tất cả --</option>
              {overview?.attendanceSummary?.map((item, index) => (
                <option key={index} value={item.month}>{item.month}</option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredAttendance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="presentRate" name="Đi học" fill="#82ca9d" />
              <Bar dataKey="absentRate" name="Vắng mặt" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng</TableCell>
                <TableCell>Tỷ lệ đi học</TableCell>
                <TableCell>Tỷ lệ vắng mặt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{isNaN(item.presentRate) ? '0%' : `${item.presentRate}%`}</TableCell>
                  <TableCell>{isNaN(item.absentRate) ? '0%' : `${item.absentRate}%`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section>
  <SectionTitle>Số ngày có thực đơn mỗi lớp</SectionTitle>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Tháng</TableCell>
        <TableCell>Lớp</TableCell>
        <TableCell>Số ngày có thực đơn</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {overview?.menuSummary?.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.month}</TableCell>
          <TableCell>{item.className}</TableCell>
          <TableCell>{item.daysWithMenu}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Section>

      </Content>
    </StatisticsContainer>
  );
};

export default Statistics;
