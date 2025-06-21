import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper, Content, Section, PartnersGrid, PartnerCard } from '../styles/PartnersStyles';
import {
  Navbar,
  Logo,
  NavigationLinks,
  NavLink,
  ButtonsContainer,
  LoginButton,
  GuestButton,
} from '../styles/styles'; // giống Home.jsx

import bg1 from '../assets/bg1.png'; // logo

// Danh sách đối tác
const partners = [
  {
    name: 'Scholastic Corporation',
    img: 'https://logotyp.us/file/scholastic.svg'
  },
  
  {
    name: 'Bright Horizons Family Solutions',
    img: 'https://download.militaryonesource.mil/msep/logos/C70C1164-139E8FA3.png'
  },
  {
    name: 'Reggio Children & Loris Malaguzzi International Centre (Ý)',
    img: 'https://teachingstrategies.com/wp-content/uploads/2021/05/CCP_Project_Based@2x_2024-758x1024.webp'
  },
  {
    name : 'Nestlé Nutrition',
    img: 'https://brandlogos.net/wp-content/uploads/2014/10/nestle-logo-brandlogos.net_.png'
  }
];

const Partners = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <PageWrapper>
      {/* Navbar giống Home */}
      <Navbar>
       <img src="/logo.jpg" alt="logo" style={{ height: "40px", objectFit: "contain" }} />
        <NavigationLinks>
          <NavLink as={Link} to="/about">Giới thiệu</NavLink>
          <NavLink as={Link} to="/news">Bản tin</NavLink>
          <NavLink as={Link} to="/contact">Liên hệ</NavLink>
          <NavLink as={Link} to="/partners">Đối tác</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Đăng nhập</LoginButton>
          <GuestButton onClick={handleLoginClick}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      <Content>
        <Section>
          <h2>🤝 Đối tác của Trường Mầm Non</h2>
         <p>
  Chúng tôi tự hào hợp tác với các công ty hàng đầu trên toàn cầu, trải dài từ lĩnh vực giáo dục, công nghệ đến dinh dưỡng và chăm sóc trẻ em. Sự đồng hành của các đối tác chiến lược giúp nhà trường không ngừng đổi mới, mang lại môi trường học tập hiện đại, an toàn và phát triển toàn diện cho trẻ nhỏ.
</p>

          <PartnersGrid>
            {partners.map((partner, idx) => (
              <PartnerCard key={idx}>
                <img src={partner.img} alt={partner.name} />
                <h3>{partner.name}</h3>
              </PartnerCard>
            ))}
          </PartnersGrid>
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default Partners;
