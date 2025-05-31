import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import axios from "axios";
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  EditButton
} from '../../styles/SettingsProfileStyles';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
  const fetchStudentInfo = async () => {
    const storedUser = JSON.parse(localStorage.getItem("studentUser"));
    console.log("Dữ liệu từ localStorage:", storedUser);

    const childId = storedUser?.childId;
    if (!childId) {
      console.warn("Không có childId trong localStorage");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children/${childId}`);
      console.log("Dữ liệu học sinh:", res.data);
      if (res.data.success) {
        setStudent(res.data.child);
      }
    } catch (err) {
      console.error("Lỗi lấy thông tin học sinh:", err);
    }
  };

  fetchStudentInfo();
}, []);


  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <Content>
        <div style={{ width: '100%', maxWidth: 1000, textAlign: 'center' }}>
          {/* ❌ GỠ input tìm kiếm */}

          {student && (
            <div style={{
              marginTop: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 60,
              flexWrap: 'wrap'
            }}>
              {/* Vòng avatar */}
              <div style={{
                width: 360,
                height: 360,
                borderRadius: '50%',
                border: '3px dashed #6c8df5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  border: '3px dashed #e74c3c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}>
                  {student.avatar ? (
                    <img
                      src={`http://localhost:4000/uploads/${student.avatar}`}
                      alt="avatar"
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "4px solid #3f67e9"
                      }}
                    />
                  ) : (
                    <div style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      background: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 30,
                      color: "#aaa",
                      border: "4px solid #3f67e9"
                    }}>
                      ?
                    </div>
                  )}
                </div>
              </div>

              {/* Thông tin */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: 400,
                width: '100%'
              }}>
                {[
                  { label: 'Họ tên', value: student.fullName },
                  { label: 'Giới tính', value: student.gender },
                  { label: 'Ngày sinh', value: new Date(student.birthday).toLocaleDateString() },
                  { label: 'Lớp', value: student.classId?.grade || "Không xác định" }
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "12px",
                      padding: "12px 18px",
                      textAlign: "left",
                      fontSize: "15px",
                      fontWeight: 500,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.label}:</span> {item.value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Content>
    </ProfileContainer>
  );
};

export default StudentProfile;
