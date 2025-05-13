import styled from 'styled-components';

export const LibraryContainer = styled.div`
  display: flex;
  background-color: #f4f6f8;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px 40px;
  margin-left: 250px; /* Để cách sidebar rõ ràng hơn */
  background-color: #f8f9fa;
  min-height: 100vh;
`;


export const LibraryHeader = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 30px;
`;

export const AddBookForm = styled.form`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BookList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 30px;
`;

export const BookItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
`;

export const BookTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
`;

export const BookAuthor = styled.span`
  font-size: 16px;
  color: #555;
  margin-left: 10px;
`;

export const ActionButton = styled.button`
  padding: 6px 14px;
  font-size: 14px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const BorrowButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;
