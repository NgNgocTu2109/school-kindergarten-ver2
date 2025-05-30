import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ClassContainer,
  SidebarContainer,
  Content,
  ClassHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '../../styles/ClassesStyles';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState({}); // lưu học sinh theo classId
  const [openClassId, setOpenClassId] = useState(null); // classId nào đang mở danh sách

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const toggleStudentList = async (classId) => {
    if (openClassId === classId) {
      setOpenClassId(null); // đóng lại nếu đang mở
    } else {
      setOpenClassId(classId);

      if (!studentsByClass[classId]) {
        try {
          const res = await axios.get(`http://localhost:4000/api/v1/children?classId=${classId}`);
          setStudentsByClass(prev => ({
            ...prev,
            [classId]: res.data.children
          }));
        } catch (err) {
          console.error("Lỗi lấy học sinh:", err);
        }
      }
    }
  };

  return (
    <ClassContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ClassHeader>Classes</ClassHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Xem học sinh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem, index) => (
              <React.Fragment key={classItem._id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{classItem.grade}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStudentList(classItem._id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px"
                      }}
                    >
                      {openClassId === classItem._id ? "Ẩn học sinh" : "Xem học sinh"}
                    </button>
                  </TableCell>
                </TableRow>

                {openClassId === classItem._id && studentsByClass[classItem._id] && (
                  <TableRow>
                    <TableCell colSpan="3">
                      <div style={{ padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}>
                        <strong>Danh sách học sinh:</strong>
                        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                          {studentsByClass[classItem._id].map((child, i) => (
                            <li key={child._id}>
                              {i + 1}. {child.fullName} ({child.gender === "male" ? "Nam" : "Nữ"})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Content>
    </ClassContainer>
  );
};

export default ClassSection;
