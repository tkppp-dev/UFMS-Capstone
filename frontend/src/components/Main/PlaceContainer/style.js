import { Card } from 'antd';
import styled from 'styled-components';

export const OfficeContainer = styled.div`
  width: 70%;
  max-width: 1120px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -5%;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardItem = styled(Card)`
  height: 213px;
  border-bottom: 2px solid #1990ff;

  & > .ant-card-body {
    padding: 0;
    height: 100%;

    & img {
      width: 100%;
      height: 156px;
    }
  }
`;
