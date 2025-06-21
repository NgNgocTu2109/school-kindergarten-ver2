import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton } from '../styles/styles';
import bg1 from '../assets/bg1.png';
import { useNavigate, Link } from 'react-router-dom';


const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #00bcd4;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
`;

const InfoBox = styled.div`
  margin-top: 40px;
  background: #e0f7fa;
  padding: 20px;
  border-radius: 10px;
  color: #004d40;
`;

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert('Gửi tin nhắn thành công!');
        setForm({ name: '', email: '', message: '' });
      } else {
        alert('Gửi thất bại, vui lòng thử lại!');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi hệ thống!');
    }
  };

  const handleLoginClick = () => navigate('/choose-user');

  return (
    <>
      <Navbar>
        <Link to="/">
        <img src="/logo.jpg" alt="logo" style={{ height: "40px", objectFit: "contain" }} />
        </Link>
        <NavigationLinks>
          <NavLink as={Link} to="/about">Giới thiệu</NavLink>
          <NavLink as={Link} to="/news">Bản tin</NavLink>
          <NavLink as={Link} to="/contact">Liên hệ</NavLink>
        <NavLink as={Link} to="/Partners">Đối Tác</NavLink> 
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Đăng nhập</LoginButton>
          <GuestButton onClick={handleLoginClick}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      <Container>
        <Title>Liên hệ với chúng tôi</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Họ và tên"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Textarea
            rows="5"
            placeholder="Nội dung tin nhắn..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <SubmitButton type="submit">Gửi tin nhắn</SubmitButton>
        </form>

        <InfoBox>
          <h4>📍 Thông tin liên hệ:</h4>
          <p>TP.Hà Nội, Việt Nam</p>
          <p>📞 0123 456 789</p>
          <p>📧 lienhe@mamnon.vn</p>
          <p>🌐 www.mamnon.vn</p>
        </InfoBox>
      </Container>
    </>
  );
};

export default ContactPage;
