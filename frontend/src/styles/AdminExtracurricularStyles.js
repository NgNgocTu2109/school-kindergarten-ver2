import styled from "styled-components";

export const AdminExtracurricularContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  width: 250px;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export const ExtracurricularHeader = styled.h2`
  text-align: center;
`;

export const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ActivityItem = styled.li`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const ActivityDescription = styled.p`  
  font-size: 14px;
  color: #666;
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

export const ActivityTitle = styled.h3`  
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ExtracurricularContainer = styled.div`  
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const FormContainer = styled.div`  
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin: 20px auto;
`;

export const Input = styled.input`  
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;


