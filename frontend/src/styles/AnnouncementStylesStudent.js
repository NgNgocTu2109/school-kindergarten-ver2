import styled from "styled-components";

export const AnnouncementContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f4f6f9;
  overflow-y: auto;
`;

export const AnnouncementHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #343a40;
`;

export const AnnouncementList = styled.div`
  display: grid;
  gap: 20px;
`;

export const AnnouncementItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const AnnouncementTitle = styled.h2`
  font-size: 20px;
  color: #212529;
  margin-bottom: 8px;
`;

export const AnnouncementContent = styled.p`
  font-size: 14px;
  color: #6c757d;
`;

export const AnnouncementForm = styled.form`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  display: block;
  margin-bottom: 8px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

export const Button = styled.button`
  padding: 10px 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
