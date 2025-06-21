import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../../styles/AttendanceStyles';

const StudentAttendance = () => {
  const studentUser = JSON.parse(localStorage.getItem("studentUser"));
  const childId = studentUser?.childId || "";
  const childName = studentUser?.fullName || "";

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weekData, setWeekData] = useState([]);

  const getVietnameseDay = (dateStr) => {
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[new Date(dateStr).getDay()];
  };

  const getOrderedWeek = (startDateStr) => {
    const date = new Date(startDateStr);
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

    const ordered = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      ordered.push(d.toISOString().split('T')[0]);
    }
    return ordered;
  };

  useEffect(() => {
    const fetchWeekData = async () => {
      const start = getOrderedWeek(selectedDate)[0];
      const end = getOrderedWeek(selectedDate)[6];
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/attendance/weekly?childId=${childId}&from=${start}&to=${end}`);
        setWeekData(res.data.weeklyDiary || []);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu tuần:', err);
      }
    };
    if (childId && selectedDate) {
      fetchWeekData();
    }
  }, [selectedDate]);

  const orderedDates = getOrderedWeek(selectedDate);

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>
            Nhật ký của bé {childName ? `– ${childName}` : ""}
          </AttendanceHeader>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginTop: "12px",
              marginBottom: "20px"
            }}
          />

          <h4 style={{ marginTop: "20px" }}>📅 Nhật ký theo tuần</h4>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thứ</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ăn</TableCell>
                <TableCell>Ngủ</TableCell>
                <TableCell>Nhận xét</TableCell>
                <TableCell>Ảnh minh chứng</TableCell>
                <TableCell>Bữa sáng</TableCell>
                <TableCell>Bữa trưa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderedDates.map((dateStr) => {
                const item = weekData.find(d => d.date === dateStr);
                return (
                  <TableRow key={dateStr}>
                    <TableCell>{getVietnameseDay(dateStr)}</TableCell>
                    <TableCell>{dateStr.split('-').reverse().join('/')}</TableCell>
                    <TableCell>{item?.status || '-'}</TableCell>
                    <TableCell>{item?.eat || '-'}</TableCell>
                    <TableCell>{item?.sleep || '-'}</TableCell>
                    <TableCell>{item?.comment || '-'}</TableCell>
                    <TableCell>
                      {item?.image ? (
                        <img
                          src={item.image.startsWith('http') ? item.image : `http://localhost:4000/${item.image}`}
                          alt="minh chứng"
                          style={{ width: '80px', borderRadius: '6px' }}
                        />
                      ) : (
                        <span style={{ color: '#888' }}>Không có ảnh</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item?.menu?.breakfast ? (
                        <>
                          <img
                            src={item.menu.breakfast.imageUrl}
                            alt={item.menu.breakfast.name}
                            style={{ width: '80px', borderRadius: '6px' }}
                          /><br />
                          <div style={{ fontWeight: 'bold' }}>{item.menu.breakfast.name}</div>
                        </>
                      ) : '-'}</TableCell>
                    <TableCell>
                      {item?.menu?.lunch ? (
                        <>
                          <img
                            src={item.menu.lunch.imageUrl}
                            alt={item.menu.lunch.name}
                            style={{ width: '80px', borderRadius: '6px' }}
                          /><br />
                          <div style={{ fontWeight: 'bold' }}>{item.menu.lunch.name}</div>
                        </>
                      ) : '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default StudentAttendance;
