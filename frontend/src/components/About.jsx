
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

import bg1 from '../assets/bg1.png';
import { FaBookOpen, FaChalkboardTeacher, FaSchool, FaHandshake } from 'react-icons/fa';

// ✅ New carousel import
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const About = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <Link to="/">
        <img src="/logo.jpg" alt="logo" style={{ height: "40px", objectFit: "contain" }} />
        </Link>
        <NavigationLinks>
          <NavLink as={Link} to="/about">Giới thiệu</NavLink>
          <NavLink as={Link} to="/news">Bản tin</NavLink>
          <NavLink href="#">Liên hệ</NavLink>
          <NavLink as={Link} to="/partners">Đối tác</NavLink>
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
              <ul>
                <li><FaBookOpen color="#6c63ff" /> Chương trình học phù hợp với lứa tuổi, vừa học vừa chơi</li>
                <li><FaChalkboardTeacher color="#ff6f61" /> Giáo viên yêu trẻ, tận tâm và chuyên nghiệp</li>
                <li><FaSchool color="#ffa500" /> Cơ sở vật chất an toàn, tiện nghi và hiện đại</li>
                <li><FaHandshake color="#28a745" /> Gắn kết phụ huynh - nhà trường vì sự phát triển của trẻ</li>
              </ul>
            </AboutText>
          </AboutInfo>
          <AboutImage src="/images/hd1.jpg" alt="Giới thiệu" />
        </AboutContainer>
      </AboutWrapper>

      {/* ✅ Video giới thiệu */}
      <div style={{ backgroundColor: "#f0faff", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#004d66" }}>
          Video giới thiệu trường
        </h2>
        <video width="80%" controls style={{ borderRadius: "12px" }}>
          <source src="/videos/gioithieu.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      {/* ✅ Slider ảnh hoạt động thực tế (không dùng slick) */}
      <div style={{ backgroundColor: "#fff", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#004d66" }}>
          Hình ảnh hoạt động thực tế
        </h2>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img src="/images/hd1.jpg" alt="hd1" />
            </div>
            <div>
              <img src="/images/hd2.jpg" alt="hd2" />
            </div>
            <div>
              <img src="/images/hd3.png" alt="hd3" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* ✅ Cam kết */}
      <div style={{ backgroundColor: "#e6f7ff", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "30px", color: "#004d66" }}>
          Cam kết từ nhà trường
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px"
        }}>
          {[
            "Đảm bảo an toàn tuyệt đối cho trẻ",
            "Báo cáo minh bạch mỗi tuần",
            "Giáo viên 100% đào tạo sư phạm mầm non",
            "Môi trường học tập thân thiện, yêu thương"
          ].map((item, idx) => (
            <div key={idx} style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
            }}>
              <p style={{ fontWeight: "bold", color: "#004d66" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
