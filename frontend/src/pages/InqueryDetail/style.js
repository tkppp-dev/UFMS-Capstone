import styled from 'styled-components';

export const RentDetailContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
`;

export const Wrap = styled.div`
  width: 90%;
  max-width: 1600px;
  background-color: white;
  border-radius: 5px;
  padding: 48px;
  margin-top: 64px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > div:nth-child(2) {
    padding-top: 10px;
    color: gray;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  padding: 16px 0 32px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 32px;

  & a {
    margin-right: 8px;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  margin-top: 32px;
  padding-top: 16px;

  & > div {
    padding: 12px;
  }
`;

export const CommentInput = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid #dbdbdb;
  margin-bottom: 16px;
`;

export const CommentButtonContainer = styled.span`
  float: right;

  & > span {
    cursor: pointer;
  }

  & > span:nth-child(1) {
    margin-right: 8px;
  }
  & > span:nth-child(2) {
    color: red;
  }
`;
