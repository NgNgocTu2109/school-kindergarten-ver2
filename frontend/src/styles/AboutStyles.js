// src/styles/aboutStyle.js
import styled from 'styled-components';
import {
  HomeContainer as BaseContainer,
  SchoolInfo as BaseInfo,
  SchoolImage as BaseImage,
  Title as BaseTitle,
  LoremTextContainer as BaseText
} from './styles';

export const AboutWrapper = styled.div`
  background: linear-gradient(to right, #c2e9fb, #a1c4fd);
  padding: 60px 20px;
  font-family: 'Quicksand', sans-serif;
  min-height: 100vh;
`;

export const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
`;

export const AboutCard = styled.div`
  background: #ffffffcc;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 600px;
`;

export const AboutTitle = styled.h2`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

export const AboutText = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
`;

export const AboutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AboutListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #555;
  margin-bottom: 12px;

  svg {
    margin-right: 10px;
    font-size: 18px;
  }
`;

export const AboutImage = styled.img`
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 480px;
  width: 100%;
  object-fit: cover;
`;

export const AboutInfo = styled.div`
  background: #ffffffd9;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  max-width: 600px;
  font-family: 'Quicksand', sans-serif;
  color: #444;

  p {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;