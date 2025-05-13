import styled from 'styled-components';

export const ChildrenContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  margin-left: 240px; /* đúng bằng sidebar */
  padding: 32px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
  width: calc(100% - 240px); /* tránh tràn khỏi màn hình */
`;





export const ChildrenContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ChildrenHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AddChildForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const AddChildInput = styled.input`
  padding: 10px;
  font-size: 16px;
  flex: 1;
`;

export const AddChildSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  flex: 1;
`;

export const AddChildButton = styled.button`
  padding: 10px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #40a9ff;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

export const TableBody = styled.tbody``;
