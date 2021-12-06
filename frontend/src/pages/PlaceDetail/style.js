import { Input } from 'antd';
import styled from 'styled-components';

export const DetailContainer = styled.div`
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

export const ModalContent = styled.div`
  display: flex;
  justify-content: flex-start;

  & > div:nth-child(2) {
    margin-left: 32px;
  }
`;

export const ContentInput = styled(Input)`
  width: 100%;
  height: 32px;
  margin-bottom: 16px;
`;
