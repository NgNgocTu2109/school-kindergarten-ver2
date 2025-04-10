import styled from "styled-components";

export const ExtracurricularContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  width: 250px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const ExtracurricularHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ActivityItem = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ActivityTitle = styled.h3`
  margin-bottom: 5px;
`;

export const ActivityDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

export const JoinButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #218838;
  }
`;
