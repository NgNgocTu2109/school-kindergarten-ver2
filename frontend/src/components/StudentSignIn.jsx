import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  StudentSignInContainer,
  LeftSection,
  RightSection,
  Logo,
  Title,
  FormContainer,
  InputField,
  SubmitButton,
  ForgotPassword
} from '../styles/StudentSignInStyles';

import loginIllustration from "../assets/SchoolStudents.png";
import axios from 'axios';

const StudentSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/v1/studentaccount/login", {
        email,
        password,
      });

      if (res.data.success) {
  const { token, child } = res.data;

  localStorage.removeItem("studentUser");
  localStorage.removeItem("studentToken");

  localStorage.setItem("studentUser", JSON.stringify({
    token,
    childId: child._id,
    fullName: child.fullName,
    classId: child.classId
  }));

  localStorage.setItem("studentToken", token);

  console.log("Lưu token và childId vào localStorage:", token, child._id);

  alert("Đăng nhập thành công!");
  navigate("/student/attendance");
  window.location.reload();
}

    } catch (err) {
      console.error("Đăng nhập lỗi:", err);
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <StudentSignInContainer>
      <LeftSection>
        <img src={loginIllustration} alt="Login Illustration" />
      </LeftSection>

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
          <SubmitButton as="button" onClick={handleSignIn}>Đăng nhập</SubmitButton>
          <ForgotPassword href="#">Quên mật khẩu?</ForgotPassword>
        </FormContainer>
      </RightSection>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
