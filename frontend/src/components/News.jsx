import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Logo,
  NavigationLinks,
  NavLink,
  ButtonsContainer,
  LoginButton,
  GuestButton,
} from '../styles/styles';

import {
  NewsContainer,
  NewsWrapper,
  NewsHeading,
  NewsItem,
  NewsTitle,
  NewsContent,
  Divider,
} from '../styles/NewsStyles';

import bg1 from "../assets/bg1.png";

const News = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/event/all')
      .then((res) => {
        if (res.data.success) {
          setEvents(res.data.events); // ✅ chỉ lấy mảng events
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sự kiện:", err);
        setEvents([]);
      });
  }, []);

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
          <NavLink as={Link} to="/contact">Liên hệ</NavLink>  
          <NavLink href="/admin/students">Trẻ nhỏ</NavLink>
          <NavLink href="/admin/teachers">Giáo viên</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Đăng nhập</LoginButton>
          <GuestButton onClick={handleLoginClick}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      <NewsContainer>
        <NewsWrapper>
          <NewsHeading>Bản Tin Nhà Trường</NewsHeading>

          {Array.isArray(events) && events.map((event, index) => (
            <React.Fragment key={event._id}>
              <NewsItem>
                <NewsTitle>{event.title}</NewsTitle>
                <NewsContent>
                  <div><strong>📅 {new Date(event.date).toLocaleDateString()}</strong></div>
                  <div>{event.description}</div>
                  {event.image && (
              <img
              src={`http://localhost:4000/uploads/${event.image}`} // ✅ sửa tại đây
              alt="Sự kiện"
              style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }}
           />
          )}
                </NewsContent>
              </NewsItem>
              {index !== events.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </NewsWrapper>
      </NewsContainer>
    </>
  );
};

export default News;
