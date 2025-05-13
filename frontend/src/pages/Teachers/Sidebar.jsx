import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsQuestionSquare, BsClipboardCheck, BsEggFried, BsCalendarEvent } from 'react-icons/bs';


const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  width: 250px;
  height: 100%;
  background-color: #2c3e50; /* Dark blue background */
  color: white;
  overflow-y: auto; /* Enable vertical scrolling */
  padding-top: 60px;
  transition: width 0.3s ease; /* Smooth width transition */
  z-index: 100; /* Ensure sidebar stays above content */
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e; /* Darker border */
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e; /* Darker background on hover */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #34495e; /* Darker background */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    return (
        <SidebarContainer style ={{width: isOpen ? '250px' : '80px'}}>
            <SidebarHeader>
                Teacher
            </SidebarHeader>
            <SidebarNav>
                <SidebarNavItem>
                    <SidebarIcon> <BsGraphUp /></SidebarIcon>
                    <StyledLink to="/teacher/dashboard">Dashboard</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon> <BsPeople /></SidebarIcon>
                    <StyledLink to="/teacher/classes">Lớp học</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
               <SidebarIcon><BsClipboardCheck /></SidebarIcon> {/* icon phù hợp cho điểm danh */}
              <StyledLink to="/teacher/attendance">Điểm danh</StyledLink>
              </SidebarNavItem>
              <SidebarNavItem>
              <SidebarIcon><BsEggFried /></SidebarIcon>
              <StyledLink to="/teacher/menu">Thực đơn</StyledLink>
              </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon> <BsFileText /></SidebarIcon>
                    <StyledLink to="/teacher/assignments">Bài tập</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon> <BsGraphDown /></SidebarIcon>
                    <StyledLink to="/teacher/performance">Kết quả học tập</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon> <BsChatDots /></SidebarIcon>
                    <StyledLink to="/teacher/communication">Thông báo</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                <SidebarIcon> <BsChatDots /> </SidebarIcon>
                <StyledLink to="/teacher/messages">Tin nhắn</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                <SidebarIcon><BsCalendarEvent /></SidebarIcon>
                <StyledLink to="/teacher/events">Sự kiện & Hoạt động</StyledLink>
                </SidebarNavItem>
                <SidebarNavItem>
                    <SidebarIcon> <BsGear /></SidebarIcon>
                    <StyledLink to="/teacher/settings">Cài đặt và thông tin</StyledLink>
                </SidebarNavItem>
                <ToggleButton onClick={toggleSidebar}>
                    <ToggleIcon isOpen={isOpen}>▲</ToggleIcon>
                </ToggleButton>
            </SidebarNav>
        </SidebarContainer>
    )
};

export default Sidebar