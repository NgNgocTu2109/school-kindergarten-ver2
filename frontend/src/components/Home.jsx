// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import vsImg from "../assets/vs-school.jpg"; // nhớ thêm ảnh này vào đúng thư mục
import { Link, useNavigate } from 'react-router-dom'; 

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const inputStyle = {
    padding: '12px 16px',
    border: 'none',
    borderBottom: '2px solid white',
    background: 'transparent',
    color: 'black',
    fontSize: '16px',
    outline: 'none'
  };
  

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt="Logo" />
        <NavigationLinks>
          <NavLink as={Link} to="/about">Giới thiệu</NavLink>
          <NavLink href="#">Bản tin</NavLink>
          <NavLink href="#">Liên hệ</NavLink>
          <NavLink href="/admin/students">Trẻ nhỏ</NavLink>
          <NavLink href="/admin/teachers">Giáo viên</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Đăng nhập</LoginButton>
          <GuestButton onClick={handleLoginClick}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      {/* Phần đầu */}
      <HomeContainer>
        <SchoolInfo>
          <Title> Hệ thống Quản lý Trường học</Title>
          <LoremTextContainer>
            <p>"Hệ thống quản lý trường học giúp tổ chức và quản lý học sinh, giáo viên một cách hiệu quả. Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho người dùng."</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Đăng ký Quản trị viên</AdminRegisterLink>
        </SchoolInfo>
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>

{/* ✅ Phần tiếp theo với nền xanh đúng tông */}
<div style={{ backgroundColor: '#62cbe9', color: '#000', padding: '60px 20px' }}>
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    <div style={{ flex: '1 1 400px' }}>
      <h2 style={{ color: '#004d66', fontSize: '32px', marginBottom: '20px' }}>Mỗi bé đều quan trọng</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
      Việc quản lý đánh giá và theo dõi tiến trình học tập của trẻ trong nhà trẻ thường tốn nhiều thời gian và công sức. Hệ thống của chúng tôi giúp giáo viên dễ dàng nhập liệu đánh giá hàng ngày và gửi báo cáo định kỳ cho phụ huynh, đảm bảo quá trình phát triển của trẻ được theo dõi sát sao và hiệu quả.
      </p>
    </div>
    <div>
      <img src={vsImg} alt="Assessment" style={{ maxWidth: '100%', borderRadius: '12px' }} />
    </div>
  </div>

  {/* 3 box feature */}
  <div style={{
    marginTop: '60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }}>
    <div style={{ background: 'white', color: 'black', padding: '24px', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>📘 Tạo kế hoạch giảng dạy</h3>
      <p>Dễ dàng tạo và chỉnh sửa kế hoạch học tập hàng ngày, phù hợp với từng độ tuổi và nhu cầu phát triển của trẻ.</p>
    </div>
    <div style={{ background: 'white', color: 'black', padding: '24px', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>🗂️ Đánh giá trẻ hàng ngày</h3>
      <p>Giáo viên có thể thực hiện đánh giá trẻ mỗi ngày, ghi chú nhận xét và lưu trữ bằng chứng phát triển của trẻ.</p>
    </div>
    <div style={{ background: 'white', color: 'black', padding: '24px', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>📊  Báo cáo tiến độ định kỳ</h3>
      <p>Phụ huynh nhận được báo cáo cập nhật định kỳ giúp theo dõi sự phát triển của con một cách sát sao và minh bạch.</p>
    </div>
  </div>
</div>

{/* ✅ Hoạt động ngoại khóa */} 
<div style={{ backgroundColor: '#f0faff', color: '#000', padding: '60px 20px' }}>
  <h2 style={{
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#004d66'
  }}>
    Hoạt động ngoại khóa nổi bật
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {[
      {
        title: 'Dã ngoại công viên',
        img: 'https://lh3.googleusercontent.com/proxy/k2jCmKMhqqhrySUHTkAZIQUElvNVvKFPBJ0aYupxRdDZJi3wuUwlR2IADOE2Q24fG7Eall58xWPDJs8s2E8wg90BzFSQYR0AUv4r5WIX5TK03aQUoClol0NvllPv',
        desc: 'Trẻ được hòa mình vào thiên nhiên, tham gia các trò chơi vận động ngoài trời tại công viên.'
      },
      {
        title: 'Ngày hội nghệ thuật',
        img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
        desc: 'Phát huy năng khiếu vẽ, tô màu, và thủ công trong ngày hội sáng tạo đầy sắc màu.'
      },
      {
        title: 'Trồng cây xanh',
        img: 'https://cdn.giaoducthoidai.vn/images/e68bd0ae7e0a4d2e84e451c6db68f2d458d23c38a855f2223f4a5193994f6f7d06cf8862735fad722688c244213d87e0aa8b8d1e02ed97f0c2625b4159f7afa059e0445732322f0cdde9d58187e9db98cb27f35e17c65de3caf2e4eab12e32d8/loi-ich-khi-day-tre-trong-cay-7313-5877.jpg.webp',
        desc: 'Các bé học cách gieo trồng và chăm sóc cây, nâng cao ý thức bảo vệ môi trường.'
      },
      {
        title: 'Giao lưu tiếng Anh',
        img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80',
        desc: 'Hoạt động học mà chơi giúp trẻ tiếp cận tiếng Anh qua bài hát, trò chơi cùng giáo viên nước ngoài.'
      },
      {
        title: 'Tham quan tiệm bánh',
        img: 'https://cdn.tgdd.vn/Files/2021/12/01/1401702/6-tiem-banh-kem-quan-7-ngon-het-nac-nhat-dinh-phai-ghe-qua-202112011959585065.jpg',
        desc: 'Khám phá cách làm bánh ngọt và được thưởng thức sản phẩm do chính mình tạo ra.'
      },
      {
        title: 'Ngày thể thao mầm non',
        img: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80',
        desc: 'Các trò chơi vận động phát triển thể chất và tinh thần đồng đội cho trẻ.'
      }
    ].map((activity, idx) => (
      <div
        key={idx}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
        }}
      >
        <img
          src={activity.img}
          alt={activity.title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '16px',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#004d66' }}>{activity.title}</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{activity.desc}</p>
      </div>
    ))}
  </div>
</div>



{/* ✅ Nhận xét từ người dùng */}
<div style={{ backgroundColor: '#62cbe9', color: '#000', padding: '60px 20px' }}>
  <h2 style={{ textAlign: 'center', fontSize: '32px', color: '#004d66', marginBottom: '40px' }}>
    Cảm nhận từ người dùng
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    {[
      {
        name: "Cô Lan",
        text: "Là giáo viên mầm non, tôi thấy hệ thống này giúp tôi tiết kiệm rất nhiều thời gian trong việc ghi chép và báo cáo.",
        img: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        name: "Anh Hưng",
        text: "Nhờ hệ thống mà tôi có thể biết con mình đang học những gì và tiến bộ ra sao mỗi tuần.",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Chị Mai",
        text: "Tôi đánh giá cao việc gửi báo cáo định kỳ rõ ràng, minh bạch từ giáo viên.",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        name: "Thầy Tuấn",
        text: "Giao diện dễ dùng, các tính năng quản lý trẻ và đánh giá hàng ngày rất tiện lợi.",
        img: "https://randomuser.me/api/portraits/men/12.jpg"
      },
      {
        name: "Quản trị viên Ngọc",
        text: "Từ khi áp dụng hệ thống, nhà trẻ của tôi vận hành chuyên nghiệp và có tổ chức hơn hẳn.",
        img: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        name: "Bố Minh",
        text: "Tôi thấy an tâm hơn khi biết rõ con mình đang học gì và được giáo viên nhận xét mỗi ngày.",
        img: "https://randomuser.me/api/portraits/men/24.jpg"
      }
    ].map((item, index) => (
      <div key={index} style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        color: '#000'
      }}>
        <img
          src={item.img}
          alt={item.name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '16px'
          }}
        />
        <p style={{ fontStyle: 'italic', marginBottom: '12px' }}>"{item.text}"</p>
        <strong>{item.name}</strong>
      </div>
    ))}
  </div>
</div>

{/* ✅ Gửi yêu cầu dùng thử (Request a Demo) */}
<div style={{
  backgroundColor: '#62cbe9',
  color: '#000',
  padding: '80px 20px'
}}>
  <h2 style={{
    textAlign: 'center',
    fontSize: '36px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#004d66'
  }}>
    Gửi yêu cầu dùng thử
  </h2>
  <p style={{
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '40px'
  }}>
    Bạn muốn trải nghiệm hệ thống quản lý mầm non? Hãy gửi yêu cầu ngay hôm nay!
  </p>

  {/* Phần form */}
  <form style={{
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }}>

    {/* Các input */}
    <input type="text" placeholder="Họ và tên" style={{
      padding: '12px 16px',
      border: 'none',
      borderBottom: '2px solid white',
      background: 'transparent',
      color: 'black',
      fontSize: '16px',
      outline: 'none'
    }} />
    <input type="email" placeholder="Địa chỉ email" style={{
      padding: '12px 16px',
      border: 'none',
      borderBottom: '2px solid white',
      background: 'transparent',
      color: 'black',
      fontSize: '16px',
      outline: 'none'
    }} />
    <input type="text" placeholder="Số điện thoại" style={{
      padding: '12px 16px',
      border: 'none',
      borderBottom: '2px solid white',
      background: 'transparent',
      color: 'black',
      fontSize: '16px',
      outline: 'none'
    }} />
    <input type="text" placeholder="Tên trường mầm non" style={{
      padding: '12px 16px',
      border: 'none',
      borderBottom: '2px solid white',
      background: 'transparent',
      color: 'black',
      fontSize: '16px',
      outline: 'none'
    }} />
    <textarea placeholder="Tin nhắn của bạn" rows="4" style={{
      padding: '12px 16px',
      border: 'none',
      borderBottom: '2px solid white',
      background: 'transparent',
      color: 'black',
      fontSize: '16px',
      outline: 'none',
      resize: 'none'
    }} />

    {/* Nút gửi */}
    <button type="submit" style={{
      backgroundColor: '#00e6f6',
      color: '#000',
      fontWeight: 'bold',
      padding: '14px 28px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      alignSelf: 'center',
      marginTop: '20px'
    }}>
      GỬI YÊU CẦU
    </button>
  </form>
</div>

{/* ✅ Liên hệ */}
<div style={{ backgroundColor: '#62cbe9', color: '#000', padding: '60px 20px' }}>
  <h2 style={{
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px'
  }}>
    Liên hệ với chúng tôi
  </h2>
  <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '40px' }}>
    Chúng tôi rất vui khi được lắng nghe từ bạn.
  </p>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px'
  }}>
    {/* Form liên hệ */}
    <form style={{
      flex: '1',
      minWidth: '300px',
      maxWidth: '500px',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="Họ" style={inputStyle} />
        <input type="text" placeholder="Tên" style={inputStyle} />
      </div>
      <input type="email" placeholder="Email" style={{ ...inputStyle, width: '100%', marginBottom: '20px' }} />
      <textarea placeholder="Lời nhắn của bạn" rows="5" style={{ ...inputStyle, width: '100%', marginBottom: '20px' }}></textarea>
      <button type="submit" style={{
        backgroundColor: '#00e6f6',
        color: '#000',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        width: '100%',
        cursor: 'pointer'
      }}>
        Gửi tin nhắn
      </button>
    </form>

    {/* Thông tin liên hệ */}
    <div style={{
      flex: '1',
      minWidth: '250px',
      maxWidth: '350px',
      color: '#000'
    }}>
      <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Thông tin liên hệ</h3>
      <p>TP.Hà Nội, Việt Nam</p>
      <p>📞 0123 456 789</p>
      <p>📧 lienhe@mamnon.vn</p>
      <p>🌐 www.mamnon.vn</p>
    </div>
  </div>
</div>

{/* ✅ Footer tiếng Việt – Nền đen */}
<div style={{ backgroundColor: '#000', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
  <p style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '16px' }}>Về Chúng Tôi</p>
  <p style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto', color: 'white' }}>
    Một startup Công nghệ Giáo dục tại Việt Nam, xây dựng công cụ đánh giá học tập tốt nhất cho trẻ em.
  </p>

  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
    {['Kết nối', 'Tin tức / Sự kiện', 'Tài nguyên', 'Chính sách bảo mật', 'Điều khoản', 'Tuyển dụng', 'Blog', 'Liên hệ'].map((link, index) => (
      <a key={index} href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>{link}</a>
    ))}
  </div>

  <p style={{ marginTop: '16px' }}>Hà Nội, Việt Nam</p>
  <p>📞 0123 456 789 </p>
  <p>📧 lienhe@SCHOOL KINDERGARTEN.vn</p>

  <div style={{ marginTop: '20px' }}>
    <a href="#"><i className="fab fa-facebook" style={{ color: 'white', margin: '0 10px' }}></i></a>
    <a href="#"><i className="fab fa-twitter" style={{ color: 'white', margin: '0 10px' }}></i></a>
    <a href="#"><i className="fab fa-linkedin" style={{ color: 'white', margin: '0 10px' }}></i></a>
    <a href="#"><i className="fab fa-instagram" style={{ color: 'white', margin: '0 10px' }}></i></a>
  </div>

  <p style={{ marginTop: '20px', fontSize: '14px', color: 'white' }}>
    © 2025 SCHOOL KINDERGARTEN || SCHOOL KINDERGARTEN.
  </p>
</div>
    </> 
  );
};

export default Home;
