import styled from 'styled-components';

export const ManagerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80vh;
  background-color: #eef2f5;
`;

export const Wrap = styled.div`
  position: absolute;
  width: 35%;

  top: 50%;
  transform: translate(0, -50%);
  border-radius: 4px;
  background-color: white;
  border-bottom: 5px solid #1990ff;

  padding: 3%;

  & > div:nth-child(1) {
    text-align: center;

    & img {
      width: 64px;
      height: 64px;
      margin-bottom: 32px;
    }
  }
`;
