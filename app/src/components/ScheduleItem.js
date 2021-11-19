import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: ${({ row }) => (row ? 1 : 'none')};
  margin: 6px 0;
`;

const SubjectText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const DetailText = styled.Text`
  font-size: 15px;
  margin-bottom: 6px;
  padding: 0 0 0 6px;
  margin: 4px 0;
`;

const ScheduleItem = function ({ title, body, row }) {
  return (
    <Container row={row}>
      <SubjectText>{title}</SubjectText>
      <DetailText>{body}</DetailText>
    </Container>
  );
};

export default ScheduleItem;
