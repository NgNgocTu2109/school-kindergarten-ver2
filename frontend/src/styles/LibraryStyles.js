import styled from 'styled-components';

export const LibraryContainer = styled.div`
  display: flex;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 240px;
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

export const LibraryHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 240px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 240px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #40a9ff;
  }
`;

export const BookList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
`;

export const BookItem = styled.li`
  background: white;
  padding: 18px 24px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
`;

export const BookTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
`;

export const BookAuthor = styled.span`
  font-size: 16px;
  color: #555;
  margin-left: 10px;
`;

export const BorrowButton = styled.button`
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #40a9ff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const HistorySection = styled.div`
  margin-top: 40px;
`;

export const HistoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HistoryItem = styled.li`
  font-size: 15px;
  margin-bottom: 8px;
  color: #333;
  line-height: 1.6;

  strong {
    color: #000;
  }

  em {
    color: #1890ff;
  }
`;

export const ActionButtonXoa = styled.button`
  padding: 6px 14px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

export const AddBookForm = styled.form`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2c3e50;
`;
  