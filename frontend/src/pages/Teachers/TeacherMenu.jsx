import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  MenuContainer,
  MenuContent,
  MenuFormWrapper,
  MenuHeader,
  MenuForm,
  MenuSelect,
  MenuInput,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '../../styles/MenuStyles';

const TeacherMenu = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [menu, setMenu] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/class/getall');
      setClasses(res.data.classes);
    } catch (err) {
      console.error('Lỗi lấy danh sách lớp:', err);
    }
  };

  const fetchMenu = async () => {
    if (!selectedClass || !date) return;
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/menus?classId=${selectedClass}&date=${date}`
      );
      setMenu(res.data.menu || null);
    } catch (err) {
      console.error('Lỗi lấy thực đơn:', err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [selectedClass, date]);

  return (
    <MenuContainer>
      <Sidebar />
      <MenuContent>
        <MenuFormWrapper>
          <MenuHeader>Thực đơn lớp học</MenuHeader>

          <MenuForm>
            <MenuSelect value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">-- Chọn lớp --</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.grade}</option>
              ))}
            </MenuSelect>

            <MenuInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </MenuForm>

          {menu ? (
            <>
              <h4>Ngày {new Date(menu.date).toLocaleDateString()}</h4>
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
                      <img src={menu.breakfast.imageUrl} alt={menu.breakfast.name} style={{ width: "120px", borderRadius: "8px" }} /><br />
                      <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "6px" }}>{menu.breakfast.name}</div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <img src={menu.lunch.imageUrl} alt={menu.lunch.name} style={{ width: "120px", borderRadius: "8px" }} /><br />
                      <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "6px" }}>{menu.lunch.name}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : (
            <p>Chưa có thực đơn cho ngày này.</p>
          )}
        </MenuFormWrapper>
      </MenuContent>
    </MenuContainer>
  );
};

export default TeacherMenu;
