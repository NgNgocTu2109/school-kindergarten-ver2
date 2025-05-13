import styled from "styled-components";

export const ServiceContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
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

export const ServiceContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ServiceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const ServiceForm = styled.form`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ServiceInput = styled.input`
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ServiceButton = styled.button`
  padding: 10px 20px;
  background-color: #1890ff;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  display: table;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 12px 8px;
  text-align: left;
  word-wrap: break-word;
`;

export const ServiceSelect = styled.select`
  padding: 10px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
