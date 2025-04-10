// TeachersStyles.js
import styled from 'styled-components';

export const TeachersContainer = styled.div`
  display: flex;
  height: 100vh; /* Đảm bảo chiều cao full màn hình */
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa nội dung */
`;

export const TeachersContent = styled.div`
  width: 100%;
  max-width: 800px; /* Giới hạn chiều rộng */
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TeachersHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center; /* Căn giữa tiêu đề */
`;

export const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const TeacherItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  text-align: center; /* Căn giữa nội dung */
`;

export const AddTeacherForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Căn giữa ô nhập */
  gap: 10px;
`;

export const AddTeacherInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddTeacherButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;
