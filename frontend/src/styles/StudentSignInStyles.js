import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentSignInContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(45deg, #87EFFF, #6CB8FF); /* Gradient xanh */
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
 background-color: #f0f8ff; /* Màu nền nhẹ nhàng */

  img {
    width: 80%;
    max-width: 400px;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #87EFFF, #6CB8FF);

`;


export const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #FF4500; /* Màu đỏ cam */
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
  background-color: #CC3700; /* Màu đỏ đậm khi hover */
}
`;

export const ForgotPassword = styled.a`
  display: block;
  margin-top: 10px;
  color: #007BFF;
  text-align: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
