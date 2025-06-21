import React, { useState } from "react";
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BsPeople, BsClipboardCheck, BsEggFried, BsCardChecklist,
  BsChatDots, BsCalendarEvent, BsGear, BsBoxArrowRight
} from 'react-icons/bs';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  padding-top: 60px;
  transition: width 0.3s ease;
  z-index: 100;
  font-family: 'Inter', sans-serif;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: #ecf0f1;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  font-size: 15px;
  border-radius: 6px;
  margin: 4px 8px;
  transition: background-color 0.25s ease;
  cursor: pointer;

  &.active,
  &:has(a.active) {
    background-color: #4b8ba9;
  }

  &:hover {
    background-color: #3b5369;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  width: 100%;
  display: block;

  &.active {
    font-weight: 600;
    color: white;
  }
`;

const SidebarIcon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #34495e;
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
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    navigate("/choose-user");
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>Teacher</SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/teacher/classes">Lớp học</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsClipboardCheck /></SidebarIcon>
          <StyledLink to="/teacher/attendance">Điểm danh</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsEggFried /></SidebarIcon>
          <StyledLink to="/teacher/menu">Thực đơn</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsCardChecklist /></SidebarIcon>
          <StyledLink to="/teacher/service-usage">Quản lý dịch vụ</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/teacher/communication">Thông báo</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/teacher/messages">Tin nhắn</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsCalendarEvent /></SidebarIcon>
          <StyledLink to="/teacher/events">Sự kiện & Hoạt động</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsGear /></SidebarIcon>
          <StyledLink to="/teacher/settings">Cài đặt và thông tin</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem onClick={handleLogout}>
          <SidebarIcon><BsBoxArrowRight /></SidebarIcon>
          <StyledLink to="/choose-user">Đăng xuất</StyledLink>
        </SidebarNavItem>
      </SidebarNav>
      <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon isOpen={isOpen}>▲</ToggleIcon>
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
