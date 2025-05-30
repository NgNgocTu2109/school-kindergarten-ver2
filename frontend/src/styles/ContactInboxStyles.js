// ContactInboxStyles.js
import styled from "styled-components";

export const InboxContainer = styled.div`
  display: flex;
  padding-left: 240px;
  background-color: #f4f7f9;
  min-height: 100vh;

  @media screen and (max-width: 768px) {
    padding-left: 0;
    flex-direction: column;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
`;

export const MessageCard = styled.div`
  background-color: #ffffff;
  border-left: 6px solid #1abc9c;
  border-radius: 10px;
  padding: 20px 28px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
`;

export const MessageHeader = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const MessageSubInfo = styled.p`
  font-size: 15px;
  color: #7f8c8d;
  margin-bottom: 12px;
`;

export const MessageContent = styled.p`
  font-size: 16px;
  color: #34495e;
  line-height: 1.7;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;

  &::before {
    margin-right: 10px;
  }
`;

export const NoMessages = styled.p`
  font-size: 18px;
  color: #aaa;
  text-align: center;
  margin-top: 60px;
`;
