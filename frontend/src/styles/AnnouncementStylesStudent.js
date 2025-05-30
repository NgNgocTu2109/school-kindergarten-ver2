import styled from 'styled-components';

// Layout tổng
export const AnnouncementContainer = styled.div`
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
  padding: 32px 40px;
  background-color: #f9f9f9;
  width: calc(100% - 250px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

// Tiêu đề
export const AnnouncementHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 24px;
`;

// Danh sách thông báo
export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
  max-width: 800px;
  width: 100%;
`;

// Mỗi item
export const AnnouncementItem = styled.li`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
`;

// Nội dung chính
export const AnnouncementTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
`;

// Thời gian
export const AnnouncementContent = styled.p`
  font-size: 15px;
  color: #666;
`;

export const SearchInput = styled.input`
  padding: 12px 16px;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 24px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
