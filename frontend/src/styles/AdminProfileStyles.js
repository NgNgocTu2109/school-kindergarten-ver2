import styled from "styled-components";

// Container chính của trang profile
export const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f6fa;
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
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

// Box chứa các thông tin cá nhân
export const ProfileDetails = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Nhãn (Label) cho từng dòng thông tin
export const ProfileLabel = styled.label`
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

// Nội dung thông tin cá nhân
export const ProfileInfo = styled.div`
  background: #f1f1f1;
  padding: 8px 12px;
  border-radius: 5px;
  color: #333;
`;

// Nút "Edit Profile"
export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
