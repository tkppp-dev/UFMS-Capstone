import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: ${({ row }) => (row ? 1 : 'none')};
  margin: 6px 0;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Information = styled.Text`
  font-size: 15px;
  margin-bottom: 6px;
  padding: 0 0 0 6px;
  margin: 4px 0;
`;

const InformationItem = function ({ title, body, row }) {
  return (
    <Container row={row}>
      <Title>{title}</Title>
      <Information>{body}</Information>
    </Container>
  );
};

export default InformationItem;
