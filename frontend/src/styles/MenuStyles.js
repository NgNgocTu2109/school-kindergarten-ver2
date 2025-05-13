import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
`;

export const MenuContent = styled.div`
  margin-left: 240px;
  padding: 32px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  width: calc(100% - 240px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px;
    width: calc(100% - 80px);
  }
`;

export const MenuFormWrapper = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const MenuHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const MenuForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

export const MenuSelect = styled.select`
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MenuInput = styled.input`
  padding: 10px;
  font-size: 16px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MenuButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
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

  @media (max-width: 768px) {
    white-space: nowrap;
    font-size: 14px;
  }
`;

export const TableBody = styled.tbody``;

export const MenuRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const MenuLabel = styled.label`
  width: 100px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
