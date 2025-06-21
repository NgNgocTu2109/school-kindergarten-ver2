import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BsFileText, BsJournalText, BsCartCheck, BsChatDots,
  BsCalendarEvent, BsBook, BsCashStack, BsGear, BsBoxArrowRight
} from "react-icons/bs";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  padding-top: 60px;
  z-index: 100;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    width: 80px;
    padding-top: 20px;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: #ecf0f1;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  font-size: 15px;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin: 4px 8px;
  transition: background-color 0.25s ease;

  &.active {
    background-color: #4b8ba9;
    font-weight: 600;
    color: white;
  }

  &:hover {
    background-color: #3b5369;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 12px;
  }
`;

const LogoutItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  margin: 4px 8px;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #3b5369;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 12px;
  }
`;

const SidebarIcon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const SidebarText = styled.span`
  margin-left: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const studentUser = JSON.parse(localStorage.getItem("studentUser"));
  const childName = studentUser?.fullName || "Students";

  const handleLogout = () => {
    localStorage.removeItem("studentUser");
    navigate("/choose-user");
  };

  return (
    <SidebarContainer>
      <SidebarHeader>{childName}</SidebarHeader>

      <nav>
        <NavItem to="/student/attendance">
          <SidebarIcon><BsJournalText /></SidebarIcon>
          <SidebarText>Nhật ký bé</SidebarText>
        </NavItem>
        <NavItem to="/student/services">
          <SidebarIcon><BsCartCheck /></SidebarIcon>
          <SidebarText>Đăng ký dịch vụ</SidebarText>
        </NavItem>
        <NavItem to="/student/messages">
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <SidebarText>Trao đổi với giáo viên</SidebarText>
        </NavItem>
        <NavItem to="/student/events">
          <SidebarIcon><BsCalendarEvent /></SidebarIcon>
          <SidebarText>Sự kiện & Hoạt động</SidebarText>
        </NavItem>
        <NavItem to="/student/communication">
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <SidebarText>Thông báo</SidebarText>
        </NavItem>
        <NavItem to="/student/bills">
          <SidebarIcon><BsCashStack /></SidebarIcon>
          <SidebarText>Hóa đơn</SidebarText>
        </NavItem>
        <NavItem to="/student/settings">
          <SidebarIcon><BsGear /></SidebarIcon>
          <SidebarText>Thông tin</SidebarText>
        </NavItem>

        <LogoutItem onClick={handleLogout}>
          <SidebarIcon><BsBoxArrowRight /></SidebarIcon>
          <SidebarText>Đăng xuất</SidebarText>
        </LogoutItem>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
