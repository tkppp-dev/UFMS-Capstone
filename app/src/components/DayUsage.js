import React from 'react';
import styled from 'styled-components/native';
import { Card, Title } from 'react-native-paper';

const Container = styled.View``;

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;

const RowTitle = styled.Text`
  width: 60px;
  font-weight: bold;
`;
const RowBody = styled.Text`
  flex: 7;
`;

const DayUsage = function ({ item }) {
  return (
    <Container>
      <Card style={{ marginVertical: 5 }}>
        <Card.Content>
          <Title style={{ marginBottom: 4 }}>{item.time}</Title>
          <RowContainer>
            <RowTitle>예약명</RowTitle>
            <RowBody>{item.reservationName}</RowBody>
          </RowContainer>
          <RowContainer>
            <RowTitle>예약자</RowTitle>
            <RowBody>{item.memberName}</RowBody>
          </RowContainer>
          <RowContainer>
            <RowTitle>위치</RowTitle>
            <RowBody>{item.facility}</RowBody>
          </RowContainer>
          <RowContainer>
            <RowTitle>공지사항</RowTitle>
            <RowBody>{item.notice.length === 0 ? '없음' : item.notice}</RowBody>
          </RowContainer>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default DayUsage;
