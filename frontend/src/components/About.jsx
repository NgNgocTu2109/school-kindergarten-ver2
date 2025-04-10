// src/components/About.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar, Logo, NavigationLinks, NavLink,
  ButtonsContainer, LoginButton, GuestButton
} from '../styles/styles';

import {
  AboutWrapper, AboutContainer, AboutInfo,
  AboutTitle, AboutText, AboutImage
} from '../styles/AboutStyles';

import aboutImg from '../assets/about.jpg';
import bg1 from '../assets/bg1.png';
import { FaBookOpen, FaChalkboardTeacher, FaSchool, FaHandshake } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink as={Link} to="/about">Giới thiệu</NavLink>
          <NavLink as={Link} to="/news">Bản tin</NavLink>
          <NavLink href="#">Liên hệ</NavLink>
          <NavLink href="/admin/students">Trẻ nhỏ</NavLink>
          <NavLink href="/admin/teachers">Giáo viên</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Đăng nhập</LoginButton>
          <GuestButton onClick={handleLoginClick}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      <AboutWrapper>
        <AboutContainer>
          <AboutInfo>
            <AboutTitle>Giới thiệu về Nhà Trẻ</AboutTitle>
            <AboutText>
              <p>
                Chào mừng bạn đến với hệ thống quản lý trường mầm non!
                Nơi đây chúng tôi không chỉ giảng dạy mà còn chăm sóc và nuôi dưỡng tâm hồn trẻ thơ bằng cả trái tim.
              </p>
              {/* Tách ul ra ngoài p */}
              <ul>
                <li><FaBookOpen color="#6c63ff" /> Chương trình học phù hợp với lứa tuổi, vừa học vừa chơi</li>
                <li><FaChalkboardTeacher color="#ff6f61" /> Giáo viên yêu trẻ, tận tâm và chuyên nghiệp</li>
                <li><FaSchool color="#ffa500" /> Cơ sở vật chất an toàn, tiện nghi và hiện đại</li>
                <li><FaHandshake color="#28a745" /> Gắn kết phụ huynh - nhà trường vì sự phát triển của trẻ</li>
              </ul>
            </AboutText>
          </AboutInfo>
          <AboutImage src={aboutImg} alt="Giới thiệu" />
        </AboutContainer>
      </AboutWrapper>
    </>
  );
};

export default About;
