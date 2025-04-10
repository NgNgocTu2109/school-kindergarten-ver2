import React from 'react';
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

      <NewsContainer>
        <NewsWrapper>
          <NewsHeading>Bản Tin Nhà Trường</NewsHeading>

          <NewsItem>
            <NewsTitle>📅 Hoạt động cuối tuần</NewsTitle>
            <NewsContent>
              Nhà trường tổ chức chương trình “Ngày hội vui chơi” cho các bé vào thứ Bảy tuần này. Mời phụ huynh cùng tham gia!
            </NewsContent>
          </NewsItem>

          <Divider />

          <NewsItem>
            <NewsTitle>📚 Thư viện mới khai trương</NewsTitle>
            <NewsContent>
              Chúng tôi vừa cập nhật hơn 500 đầu sách mới tại thư viện mầm non, giúp trẻ tiếp cận tri thức sớm và hiệu quả.
            </NewsContent>
          </NewsItem>

          <Divider />

          <NewsItem>
            <NewsTitle>👩‍🏫 Hội thảo “Cha mẹ đồng hành cùng con”</NewsTitle>
            <NewsContent>
              Sự kiện tổ chức vào 9h sáng Chủ nhật tuần này tại hội trường chính – bố mẹ nhớ sắp xếp thời gian tham dự nhé!
            </NewsContent>
          </NewsItem>

        </NewsWrapper>
      </NewsContainer>
    </>
  );
};

export default News;
