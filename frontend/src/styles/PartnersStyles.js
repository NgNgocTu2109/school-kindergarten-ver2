import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #f4f6f9;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  width: 100%;
`;

export const Section = styled.div`
  max-width: 1100px;
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin: 20px;
  transition: all 0.3s ease;

  h2 {
    color: #2c3e50;
    margin-bottom: 24px;
    font-size: 32px;
    font-weight: 700;
    border-bottom: 3px solid #00bcd4;
    padding-bottom: 12px;
    display: inline-block;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    text-align: justify;
    color: #444;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    h2 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  justify-items: center;
`;

export const PartnerCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 220px;

  img {
    width: 100%;
    max-height: 100px;
    object-fit: contain;
    margin-bottom: 16px;
    transition: transform 0.3s;
  }

  h3 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    min-height: 50px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }
  }
`;
