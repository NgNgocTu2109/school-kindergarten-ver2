// PerformanceStyles.js
import styled from 'styled-components';

export const PerformanceContainer = styled.div`
  display: flex;
  height: 100vh; /* Đảm bảo chiều cao full màn hình */
  background-color: #f4f4f4;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa nội dung */
`;

export const PerformanceContent = styled.div`
  width: 100%;
  max-width: 900px; /* Giới hạn chiều rộng */
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const PerformanceHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export const SchoolPerformance = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
`;

export const IndividualPerformance = styled.div`
  padding: 15px;
  background-color: #ffecb3;
  border-radius: 8px;
  text-align: center;
`;

export const PerformanceInfo = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

export const PerformanceGraphContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalMarks = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;
