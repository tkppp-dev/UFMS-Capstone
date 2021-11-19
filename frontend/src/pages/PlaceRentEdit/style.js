import { Button, Input } from 'antd';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

export const WriteContainer = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 64px;
`;

export const Title = styled.h1`
  margin-top: 48px;
`;

export const TitleInput = styled(Input)`
  width: 100%;
  height: 48px;
`;

export const ContentsInput = styled(ReactQuill)`
  height: 400px;
  width: 100%;
  margin-top: 16px;
  background-color: white;
`;

export const SubmitButton = styled(Button)`
  float: right;
  margin-top: 64px;
`;
