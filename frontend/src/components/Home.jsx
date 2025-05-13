// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink } 
from '../styles/styles'
import axios from 'axios';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import vsImg from "../assets/vs-school.jpg";
import nenImage from "../assets/hinh nen.jpg"; 
import bgCloud from '../assets/hinh nen.jpg'; 
import mobileImg from '../assets/mobile.jpg';
import laptopImg from '../assets/laptop.jpg'; 
import teacherAppImg from '../assets/teachermobile.jpg';


import { Link, useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:4000/api/v1/event/all')
      .then((res) => {
        if (res.data.success) setEvents(res.data.events);
      })
      .catch((err) => console.error("Lỗi lấy sự kiện:", err));
  }, []);

  const navigate = useNavigate();

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
          <NavLink as={Link} to="/news">Bản tin</NavLink>
          <NavLink href="#">Liên hệ</NavLink>
          <NavLink href="/admin/students">Trẻ nhỏ</NavLink>
          <NavLink href="/admin/teachers">Giáo viên</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={() => navigate('/choose-user')}>Đăng nhập</LoginButton>
          <GuestButton onClick={() => navigate('/choose-user')}>Chế độ Khách</GuestButton>
        </ButtonsContainer>
      </Navbar>

      {/* Phần đầu (GIỮ NGUYÊN nền xanh) */}
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

      {/* ✅ Phần tiếp theo - có HÌNH NỀN */}
      <div style={{
        backgroundImage: `url(${nenImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '60px 20px',
        color: '#000'
      }}>
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
              Việc quản lý đánh giá và theo dõi tiến trình học tập của trẻ trong nhà trẻ thường tốn nhiều thời gian và công sức. Hệ thống của chúng tôi giúp giáo viên dễ dàng nhập liệu đánh giá hàng ngày và gửi báo cáo định kỳ cho phụ huynh.
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
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>📊 Báo cáo tiến độ định kỳ</h3>
            <p>Phụ huynh nhận được báo cáo cập nhật định kỳ giúp theo dõi sự phát triển của con một cách sát sao và minh bạch.</p>
          </div>
        </div>
      </div>


{/* Tương tác nhà trường (Admin / Giáo viên / Phụ huynh) */} 
<div style={{
  backgroundImage: `url(${bgCloud})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '80px 20px',
  position: 'relative',
  overflow: 'hidden'
}}>

  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  }}>
    {/* Admin */}
    <div style={{
      flex: '1 1 280px',
      textAlign: 'center',
      marginBottom: '40px',
      padding: '0 10px'
    }}>
      <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="Admin"
        style={{ width: '60px', marginBottom: '16px' }}
      />
      <div style={{ color: '#f05a5a', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
        WEBSITE/APP QUẢN TRỊ
      </div>
      <p style={{ fontSize: '16px' }}>Dành cho Nhà trường</p>
    </div>

    {/* Ảnh điện thoại */}
    <div style={{
      flex: '1 1 320px',
      margin: '20px',
      position: 'relative',
      textAlign: 'center'
    }}>
      <div style={{
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        border: '3px dotted #f05a5a',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(20deg)',
        zIndex: -1,
        boxSizing: 'border-box'
      }}></div>
      <div style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '3px dotted #00bfa5',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-20deg)',
        zIndex: -2,
        boxSizing: 'border-box'
      }}></div>
      <img
      src={mobileImg}
      alt="App"
      style={{
      width: '100%',
      maxWidth: '300px',
      height: 'auto',
      borderRadius: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
      position: 'relative',
      zIndex: 1
  }}
/>

    </div>

    {/* Giáo viên + Phụ huynh */}
    <div style={{
      flex: '1 1 280px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '60px',
      marginBottom: '40px',
      padding: '0 10px'
    }}>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Teacher"
          style={{ width: '60px', marginBottom: '16px' }}
        />
        <div style={{ color: '#00bfa5', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
          MOBILE APP
        </div>
        <p style={{ fontSize: '16px' }}>Dành cho Giáo viên</p>
      </div>
      <div>
        <img src="https://cdn-icons-png.flaticon.com/512/194/194931.png" alt="Parent"
          style={{ width: '60px', marginBottom: '16px' }}
        />
        <div style={{ color: '#ffb74d', fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
          MOBILE APP
        </div>
        <p style={{ fontSize: '16px' }}>Dành cho Phụ huynh</p>
      </div>
    </div>
  </div>
</div>

{/* ✅ Trang Giới thiệu Quản trị nhà trường */}
<div style={{
  backgroundImage: `url(${bgCloud})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '80px 20px'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
  }}>
    {/* BÊN TRÁI */}
    <div style={{
      flex: '1 1 500px',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#2196f3',
        fontWeight: 'bold',
        fontSize: '26px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <i className="fas fa-cogs" style={{ fontSize: '28px' }}></i>
        WEBSITE/MOBILE APP QUẢN TRỊ NHÀ TRƯỜNG
      </h2>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Quản lý lớp học, tương tác phụ huynh trên một công cụ:
      </p>
      <img
        src={laptopImg}
        alt="Laptop quản lý"
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      />
    </div>

    {/* BÊN PHẢI */}
    <div style={{
      flex: '1 1 400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      {[
        {
          icon: 'fas fa-users-cog',
          text: 'Quản lý thống nhất và toàn vẹn thông tin cán bộ nhân viên, học sinh và phụ huynh'
        },
        {
          icon: 'fas fa-book',
          text: 'Quản lý chương trình dạy và học, chương trình ngoại khóa, sự kiện'
        },
        {
          icon: 'fas fa-bullhorn',
          text: 'Thông báo, thống kê khảo sát nhanh chóng, chính xác'
        },
        {
          icon: 'fas fa-file-invoice-dollar',
          text: 'Tính khoản thu và gửi thông báo học phí đến từng phụ huynh'
        }
      ].map((item, idx) => (
        <div key={idx} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(255,255,255,0.8)',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <i className={item.icon} style={{
            fontSize: '28px',
            color: ['#00bcd4', '#f44336', '#4caf50', '#ff9800'][idx]
          }}></i>
          <p style={{ fontSize: '16px', margin: 0 }}>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</div>


{/* ✅ Mobile App Giáo viên */}
<div style={{
  backgroundImage: `url(${bgCloud})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '80px 20px'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px'
  }}>
    {/* BÊN TRÁI: Tiêu đề + mô tả */}
    <div style={{
      flex: '1 1 400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      <h2 style={{
        color: '#009688',
        fontWeight: 'bold',
        fontSize: '26px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <i className="fas fa-chalkboard-teacher" style={{ fontSize: '28px' }}></i>
        MOBILE APP GIÁO VIÊN
      </h2>
      <p style={{ fontSize: '18px' }}>
        Quản lý lớp học, tương tác phụ huynh trên một công cụ:
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {[
          'Quản lý mọi thông tin liên quan lớp học: điểm danh, ăn uống, sinh hoạt, thuốc, chỉ số phát triển của trẻ,…',
          'Chủ động cập nhật thông báo và hoạt động toàn trường',
          'Tương tác với phụ huynh dễ dàng: nhận xét hàng ngày, lời nhắn nhủ, dặn thuốc,…'
        ].map((text, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'rgba(255,255,255,0.8)',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <i
              className={[
                'fas fa-tasks',
                'fas fa-bell',
                'fas fa-comments'
              ][idx]}
              style={{
                fontSize: '24px',
                color: ['#00bcd4', '#f44336', '#4caf50'][idx]
              }}
            ></i>
            <p style={{ fontSize: '16px', margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* BÊN PHẢI: Ảnh */}
    <div style={{
      flex: '1 1 500px',
      textAlign: 'center'
    }}>
      <img
        src={teacherAppImg}
        alt="Mobile App Giáo viên"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      />
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
  {events.map((event) => (
    <div
      key={event._id}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      {event.image && (
        <img
          src={`http://localhost:4000/uploads/${event.image}`}
          alt={event.title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '16px',
            transition: 'transform 0.3s ease'
          }}
        />
      )}
      <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#004d66' }}>{event.title}</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{event.description}</p>
    </div>
  ))}
</div>
</div>


{/* ✅ Gửi yêu cầu dùng thử (Request a Demo) */}
<div style={{
  backgroundImage: `url(${bgCloud})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '80px 20px',
  color: '#000'
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
<div style={{
  backgroundImage: `url(${bgCloud})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#000',
  padding: '60px 20px'
}}>
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


{/* ✅ Footer tiếng Việt – Nền xám */}
<div style={{ backgroundColor: '#333', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
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
