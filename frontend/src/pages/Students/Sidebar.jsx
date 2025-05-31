import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  BsFileText, BsJournalText, BsCartCheck, BsChatDots,
  BsCalendarEvent, BsBook, BsCashStack, BsGear
} from "react-icons/bs";

// Styled-components
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

  @media (max-width: 768px) {
    width: 80px;
    padding-top: 20px;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid #34495e;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 12px;
  }
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
  font-size: 18px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const SidebarText = styled.span`
  margin-left: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Component
const Sidebar = () => {
  const studentUser = JSON.parse(localStorage.getItem("studentUser"));
  const childName = studentUser?.fullName || "Students";

  return (
    <SidebarContainer>
      <SidebarHeader>{childName}</SidebarHeader>

      <nav>
        <NavItem to="/student/assignments">
          <SidebarIcon><BsFileText /></SidebarIcon>
          <SidebarText>Bài tập</SidebarText>
        </NavItem>
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
        <NavItem to="/student/library">
          <SidebarIcon><BsBook /></SidebarIcon>
          <SidebarText>Thư viện</SidebarText>
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
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
