import styled from 'styled-components';

// Layout chính, dùng flexbox để căn chỉnh
export const AnnouncementContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

// Sidebar chiếm 250px, giữ cố định
export const SidebarContainer = styled.div`
  flex: 0 0 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  min-height: 100vh;
`;

// Nội dung chính (bên phải sidebar)
export const Content = styled.div`
  flex: 1;
  padding: 30px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

// Tiêu đề chính
export const AnnouncementHeader = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

// Form nhập thông báo
export const AnnouncementForm = styled.form`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

// Group chứa label và input
export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

// Label của form
export const Label = styled.label`
  display: block;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 6px;
  font-size: 16px;
`;

// Ô nhập nội dung thông báo
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Nút gửi thông báo
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Danh sách các thông báo đã đăng
export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

// Mỗi item trong danh sách
export const AnnouncementItem = styled.li`
  background: #ecf0f1;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); 
`;

// Nội dung thông báo
export const AnnouncementContent = styled.p`
  font-size: 16px;
  color: #2c3e50;
`;

// Tiêu đề của mỗi thông báo
export const AnnouncementTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;


export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledAnnouncementListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
`;

export const StyledTable = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;

  th, td {
    border: 1px solid #ccc;
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #e6f7ff;
  }
`;
