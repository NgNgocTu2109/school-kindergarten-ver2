import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChooseUserContainer = styled.div`
    text-align: center;
    padding: 50px;
    min-height: 100vh;
    background: linear-gradient(to right, #70c9c5, #8994db); /* Gradient giống ảnh */
`;

export const UserSection = styled.div`
    display: inline-block;
    width: 250px;
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
`;

export const UserImage = styled.img`
    width: 80px;
    height: 80px;
`;

export const Button = styled(Link)`
    display: inline-block;
    text-decoration: none;
    background-color: #6AB7D6; /* Màu xanh nút */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 10px;
    font-weight: bold;

    &:hover {
        background-color: #4A90A2; /* Màu hover */
    }
`;
