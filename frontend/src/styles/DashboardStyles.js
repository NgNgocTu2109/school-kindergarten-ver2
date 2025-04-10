import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  background: #f4f7fc;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 270px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  color: #007bff;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const CardContent = styled.p`
  font-size: 16px;
  color: #555;
`;

export const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

//Admin 
export const AdminDashboardContainer = styled.div`
  display: flex;
  background: #f4f7fc;
  min-height: 100vh;
`;

export const BottomContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

export const StudentDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
`;

export const TeacherDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
`;
