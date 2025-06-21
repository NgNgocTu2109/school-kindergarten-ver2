import React, { useState } from "react";
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook,
  BsGraphDown, BsCalendar, BsGear, BsChatDots, BsClipboard,
  BsBarChart, BsPeopleFill, BsEggFried, BsCalendarEvent,
  BsEnvelope, BsBoxArrowRight,
} from 'react-icons/bs';

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.isOpen ? '250px' : '80px')};
  height: 100%;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  padding-top: 60px;
  transition: width 0.3s ease;
  z-index: 100;
  font-family: 'Inter', sans-serif;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
`;

const SidebarHeader = styled.div`
  padding: 16px;
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
  margin-left: 12px;
  width: 100%;
  display: block;
  transition: none;

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
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3f5873;
  }
`;

const ToggleIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  color: white;
  font-size: 20px;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>Admin</SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/admin/classes">Lớp học</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPerson /></SidebarIcon>
          <StyledLink to="/admin/teachers">Giáo viên</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeopleFill /></SidebarIcon>
          <StyledLink to="/admin/children">Quản lý tài khoản học sinh</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink to="/admin/fees">Hóa đơn tháng</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/admin/communication">Thông báo</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsEggFried /></SidebarIcon>
          <StyledLink to="/admin/menu">Thực đơn</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsGear /></SidebarIcon>
          <StyledLink to="/admin/services">Quản lý dịch vụ</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsCalendarEvent /></SidebarIcon>
          <StyledLink to="/admin/events">Sự kiện & Hoạt động</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsEnvelope /></SidebarIcon>
          <StyledLink to="/admin/contact-inbox">Hộp thư liên hệ</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
        <SidebarIcon><BsClipboard /></SidebarIcon>
        <StyledLink to="/admin/student-history">Lịch sử học sinh</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsBarChart /></SidebarIcon>
          <StyledLink to="/admin/statistics">Báo cáo & Thống kê</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem onClick={handleLogout}>
          <SidebarIcon><BsBoxArrowRight /></SidebarIcon>
          <StyledLink to="/">Đăng xuất</StyledLink>
        </SidebarNavItem>
      </SidebarNav>

      <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon isOpen={isOpen}>▲</ToggleIcon>
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
