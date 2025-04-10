// NewsStyles.js
import styled from 'styled-components';

export const NewsContainer = styled.div`
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  padding: 60px 20px;
  font-family: 'Quicksand', sans-serif;
  min-height: 100vh;
`;

export const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const NewsCard = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

export const NewsTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const NewsDate = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

export const NewsContent = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;

export const SectionTitle = styled.h1`
  font-size: 36px;
  color: #444;
  text-align: center;
  margin-bottom: 40px;
`;


export const Divider = styled.hr`
  border: none;
  border-top: 2px dashed #ccc;
  margin: 20px 0;
`;

export const NewsHeading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

export const NewsItem = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h2 {
    font-size: 22px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    line-height: 1.6;
  }
`;
