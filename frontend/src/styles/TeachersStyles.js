import styled from 'styled-components';

export const TeachersContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const TeachersContent = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const TeachersHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
`;

export const TeacherList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

export const TeacherCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddTeacherForm = styled.form`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

export const AddTeacherInput = styled.input`
  padding: 12px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

export const AddTeacherButton = styled.button`
  padding: 12px 20px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0b7dda;
  }
`;

export const ButtonEdit = styled.button`
  background: #ff9800;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #fb8c00;
  }
`;

export const ButtonDelete = styled.button`
  background: #f44336;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #e53935;
  }
`;

export const ButtonSave = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    background: #43a047;
  }
`;
