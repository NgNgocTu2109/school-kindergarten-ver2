import styled from "styled-components";

// Container chính của trang profile giáo viên
export const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #eef2f7;
`;

// Sidebar và nội dung chính
export const SidebarContainer = styled.div`
  display: flex;
  width: 100%;
`;

// Nội dung bên phải (phần profile)
export const Content = styled.div`
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Tiêu đề "Profile Details"
export const ProfileHeader = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
`;

// Box chứa các thông tin cá nhân
export const ProfileDetails = styled.div`
  width: 100%;
  max-width: 550px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 5px solid #007bff;
`;

// Nhãn (Label) cho từng dòng thông tin
export const ProfileLabel = styled.label`
  font-weight: bold;
  color: #34495e;
  margin-bottom: 6px;
  font-size: 16px;
`;

// Nội dung thông tin cá nhân
export const ProfileInfo = styled.div`
  background: #ecf0f1;
  padding: 10px 15px;
  border-radius: 5px;
  color: #2c3e50;
  font-size: 15px;
`;

// Nút "Edit Profile"
export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
