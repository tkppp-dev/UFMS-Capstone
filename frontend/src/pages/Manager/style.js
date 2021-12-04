import styled from 'styled-components';

export const ManagerContainer = styled.div`
  width: 100%;
  background-color: #eef2f5;
`;

export const Wrap = styled.div`
  position: absolute;
  width: 35%;
  margin-left: 32%;
  text-align: center;

  top: 50%;
  transform: translate(0, -50%);
  border-radius: 4px;
  background-color: white;
  border-bottom: 5px solid #1990ff;

  padding: 3%;

  & > div:nth-child {
    text-align: center;
  }
`;

export const IsAuthenticatedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dbdbdb;
`;

export const LeftSide = styled.div`
  width: 20%;
  height: 100%;

  & > div > div:nth-child(1) {
    width: 90%;
    height: 32px;
    margin-bottom: 16px;
    margin-left: 5%;
    margin-top: 24px;
  }

  & > div:nth-child(3) {
    margin-top: 16px;
  }

  & a {
    margin-left: 10%;
    color: black;
  }
`;

export const RightSide = styled.div`
  width: 80%;
  height: 100%;
  background-color: white;
`;
