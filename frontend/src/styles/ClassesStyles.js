// ClassesStyles.js
import styled from 'styled-components';

export const ClassesContainer = styled.div`
  display: flex;
  padding-left: 240px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;  
`;

export const ClassesContent = styled.div`
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export const ClassesHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ClassItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddClassForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const AddClassInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const AddClassButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ClassContainer = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */

  @media screen and (max-width: 768px) {
    flex: 0 0 80px;
  }
`;

export const ClassHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const GradeHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ClassItemHover = styled(ClassItem)`
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9f5ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }
`;

export const ClassItemText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

// Table styling
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

export const TableHead = styled.thead`
  background-color: #007bff;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #e9f5ff;
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-size: 15px;
  font-weight: 500;

  ${TableHead} & {
    color: white;
    font-weight: bold;
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;

export const AddClassSelect = styled.select`
  padding: 8px;
  margin-right: 8px;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const TableBody = styled.tbody``;
