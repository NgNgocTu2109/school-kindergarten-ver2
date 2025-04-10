import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: "Poppins", sans-serif;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #ddd;
`;

export const ProfileHeader = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
  font-weight: 700;
  text-align: center;
`;

export const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 16px;
  min-width: 120px;
`;

export const Value = styled.span`
  font-size: 16px;
  color: #555;
`;

export const EditButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
  width: 100%;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;


export const ProfileDetails = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const ProfileInfo = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-bottom: 20px;
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  color: #555;
  font-size: 16px;
  display: inline-block;
  min-width: 120px; /* Giúp căn chỉnh đẹp hơn */
  text-align: right;
  margin-right: 10px;
`;
