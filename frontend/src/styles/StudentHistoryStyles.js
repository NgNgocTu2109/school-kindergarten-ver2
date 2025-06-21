import styled from "styled-components";

export const HistoryContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 240px; /* tránh bị dính vào Sidebar */
  padding: 32px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 16px;
  }
`;

export const HistoryContent = styled.div`
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HistoryHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #2c3e50;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;

  img {
    max-width: 80px;
    border-radius: 6px;
  }
`;

export const TableBody = styled.tbody``;
