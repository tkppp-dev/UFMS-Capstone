import styled from 'styled-components';

export const MyPageContainer = styled.div`
  width: 100%;
  min-height: 500px;
  margin-bottom: 64px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5%;
`;

export const Profile = styled.div`
  background-color: white;
  width: 48%;
  height: 420px;
  padding: 32px;
  border-bottom: 3px solid #1990ff;

  & > div:nth-child(1) {
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: 1px solid #dbdbdb;
  }
`;

export const Schedule = styled.div`
  background-color: white;
  width: 48%;
  padding: 32px;
  border-bottom: 3px solid #1990ff;

  & > div:nth-child(1) {
    margin-bottom: 32px;
  }

  & > div:nth-child(2) {
    border-top: 1px solid #dbdbdb;
  }
`;
