import styled from 'styled-components';
import hinhnen from '../assets/hinh nen.jpg';

export const ProfileContainer = styled.div`
  display: flex;
  background: url(${hinhnen}) no-repeat center center/cover;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  position: relative;
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

  @media (max-width: 768px) {
    margin-left: 80px;
    padding: 20px;
  }
`;

export const ProfileCard = styled.div`
  width: 320px;
  height: 620px;
  background: #ffffffee;
  border-radius: 40px;
  padding: 32px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 24px;
  }
`;



export const ProfileHeader = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 24px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #eaf4ff;
  padding: 10px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 15px;
`;


export const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 130px;
`;

export const Value = styled.span`
  font-size: 16px;
  color: #555;
  text-align: right;
  flex: 1;
`;

export const EditButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ProfileDetails = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const ProfileInfo = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: left;
  margin-bottom: 20px;
`;

export const ProfileLabel = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 16px;
  display: inline-block;
  min-width: 120px;
  text-align: right;
  margin-right: 10px;
`;

export const AvatarImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
  margin-bottom: 20px;
`;

export const AvatarWrapper = styled.div`
  margin: 24px auto 32px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const CloudBackground = styled.div`
  background-image: url("/src/assets/hinhnnen.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

