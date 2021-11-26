import { Button, Col } from 'antd';
import styled from 'styled-components';

export const ManageContainer = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 5%;
`;

export const Title = styled.div`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 32px;
`;

export const ColBox = styled(Col)`
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  & > div:nth-child(1) {
    color: #1990ff;
    cursor: pointer;
    margin-right: 8px;
  }

  & > div:nth-child(2) {
    color: red;
    cursor: pointer;
  }
`;

export const AddButton = styled(Button)`
  margin-top: 32px;
  float: right;
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & input {
    width: 88%;
  }
`;
