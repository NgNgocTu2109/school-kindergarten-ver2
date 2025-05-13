import styled from 'styled-components';

export const StatisticsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* 👈 Khoảng cách tránh bị dính vào sidebar */
`;

export const Section = styled.div`
  margin-bottom: 3rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #e9ecef;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f1f3f5;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  text-align: left;
  font-size: 0.95rem;
`;
