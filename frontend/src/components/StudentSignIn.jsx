import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển trang
import { 
  StudentSignInContainer,
  LeftSection,
  RightSection,
  Logo,
  Title,
  FormContainer,
  InputField,
  SubmitButton,
  ForgotPassword } from '../styles/StudentSignInStyles';
  import loginIllustration from "../assets/SchoolStudents.png"; // Cập nhật đường dẫn ảnh
  import axios from 'axios'; // Import axios


const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook để chuyển hướng

const handleSignIn = (e) => {
  e.preventDefault(); // Ngăn chặn reload trang
  console.log('Student Sign In', { email, password });



  // Giả lập xác thực tài khoản (sau này có thể gọi API)
  if (email === 'std@gmail.com' && password === '123456') {
    alert('Đăng nhập thành công!');
    navigate('/student/attendance'); // Chuyển hướng đến trang admin
  } else {
    alert('Sai email hoặc mật khẩu!');
  }

};

  return (
    <StudentSignInContainer>
      {/* Nửa bên trái - Ảnh minh họa */}
      <LeftSection>
        <img src={loginIllustration} alt="Login Illustration" />
      </LeftSection>

      {/* Nửa bên phải - Form đăng nhập */}
      <RightSection>
        <Logo src="School.png" alt="Logo School Kindergarten" />
        <Title>Đăng nhập Student</Title>

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
         <SubmitButton to="/student/attendance" onClick={handleSignIn}>Đăng nhập</SubmitButton>
         <ForgotPassword href="#">Quên mật khẩu?</ForgotPassword>

        </FormContainer>
        </RightSection>
    </StudentSignInContainer>
  )
}

export default StudentSignIn;