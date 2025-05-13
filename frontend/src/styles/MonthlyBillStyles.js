import styled from "styled-components";

export const BillContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const BillContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 220px; /* 👈 chừa khoảng cho sidebar */

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 16px;
  }
`;

export const BillFormWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const BillTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const BillMonthSelector = styled.input`
  padding: 6px 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BillTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  display: table;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const BillTableHead = styled.th`
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BillTableBody = styled.tbody``;

export const BillTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const BillTableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
