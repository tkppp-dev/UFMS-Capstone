import { Button, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const AddContainer = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 64px;
`;

export const Title = styled.h1`
  margin-top: 48px;
`;

export const LocationInput = styled(Input)`
  width: 100%;
  height: 48px;
`;

export const NoticeInput = styled(TextArea)`
  width: 100%;
  height: 400px;
  margin-top: 16px;
  background-color: white;
`;

export const SubmitButton = styled(Button)`
  float: right;
  margin-top: 64px;
`;
