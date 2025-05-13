import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const MessageContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  margin-left: 220px; /* Để tránh bị dính vào Sidebar */

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px;
  }
`;

export const MessageBox = styled.div`
  background-color: #fefefe;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const SenderName = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MessageText = styled.div`
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ReplyForm = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ReplyInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ReplyButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
