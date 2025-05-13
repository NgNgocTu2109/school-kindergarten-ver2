import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  margin-left: 220px; /* Dành chỗ cho sidebar */

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 16px;
  }
`;

export const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EventItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const EventImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const EventInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 5px 0;
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    margin: 0 0 4px 0;
    color: #333;
  }

  small {
    color: #888;
  }
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #b02a37;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EventCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

export const EventContainer = styled.div`
  padding: 24px;
  margin-left: 250px; // để không dính vào sidebar

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 16px;
  }
`;

export const EventTitle = styled.h3`
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const EventDescription = styled.p`
  color: #555;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const EventContent = styled.div`
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.6;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const EventDate = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 6px;
`;

export const EventDetails = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #555;
`;
