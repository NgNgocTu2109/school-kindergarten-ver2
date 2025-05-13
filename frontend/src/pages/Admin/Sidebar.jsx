import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsClipboard, BsBarChart, BsPeopleFill, BsEggFried, BsCalendarEvent } from 'react-icons/bs';

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
  border-bottom: 1px solid #34495e;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e;
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>Admin</SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/admin/classes">Lớp học</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPerson /></SidebarIcon>
          <StyledLink to="/admin/teachers">Giáo viên</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
        <SidebarIcon><BsPeopleFill /></SidebarIcon> {/* icon khác nếu bạn thích */}
        <StyledLink to="/admin/children">Quản lý học sinh</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
        <SidebarIcon><BsFileText /></SidebarIcon>
        <StyledLink to="/admin/fees">Hóa đơn tháng</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/admin/library">Thư viện</StyledLink>
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
        <SidebarIcon><BsBarChart /></SidebarIcon>
        <StyledLink to="/admin/statistics">Báo cáo & Thống kê</StyledLink>
        </SidebarNavItem>

      </SidebarNav>
      <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon isOpen={isOpen}>▲</ToggleIcon>
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
