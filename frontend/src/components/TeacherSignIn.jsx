import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển trang
import { TeacherSignInContainer, LeftSection, RightSection, Logo, Title, FormContainer, InputField, SubmitButton, ForgotPassword } from '../styles/TeacherSignInStyles';
import axios from 'axios'; // Import axios
import loginIllustration from "../assets/SchoolStudents.png"; // Cập nhật đường dẫn ảnh

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook để chuyển hướng

  const handleSignIn = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    console.log('Teacher Sign In', { email, password });
  
  
  
    // Giả lập xác thực tài khoản (sau này có thể gọi API)
    if (email === 'teacher@gmail.com' && password === '123456') {
      alert('Đăng nhập thành công!');
      navigate('/teacher/dashboard'); // Chuyển hướng đến trang admin
    } else {
      alert('Sai email hoặc mật khẩu!');
    }
    
  };

  return (
    <TeacherSignInContainer>
      {/* Nửa bên trái - Ảnh minh họa */}
            <LeftSection>
              <img src={loginIllustration} alt="Login Illustration" />
            </LeftSection>
      
            {/* Nửa bên phải - Form đăng nhập */}
            <RightSection>
              <Logo src="School.png" alt="Logo School Kindergarten" />
              <Title>Đăng nhập Teacher</Title>
      <FormContainer>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <SubmitButton to="/teacher/dashboard" onClick={handleSignIn}>Đăng nhập</SubmitButton>
        <ForgotPassword href="#">Quên mật khẩu?</ForgotPassword>

        </FormContainer>
        </RightSection>
    </TeacherSignInContainer>
  )
}

export default TeacherSignIn;