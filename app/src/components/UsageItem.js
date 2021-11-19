import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Paragraph } from 'react-natvie-paper';

export default UsageItem = function () {
  return (
    <Card style={{ marginVertical: 5 }}>
      <Card.Content>
        <Title>10:30AM~12:00PM</Title>
        <Paragraph>
          <View>
            <Text>예약자</Text>
          </View>
        </Paragraph>
      </Card.Content>
    </Card>
  );
};
