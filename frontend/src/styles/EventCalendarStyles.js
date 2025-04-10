import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background: white;
`;

export const Events = styled.div`
  margin-top: 20px;
`;

export const Event = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #eef2f7;
  border-left: 5px solid #007bff;
  border-radius: 6px;
  font-size: 16px;
`;

export const AddEventForm = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const EventInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const AddEventButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
  font-weight: bold;
`;
