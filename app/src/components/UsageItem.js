import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Paragraph } from 'react-natvie-paper';

export default UsageItem = function () {
  return (
    <Card style={{ marginVertical: 5 }}>
      <Card.Content>
        <Title>10:30AM~12:00PM</Title>
        <Paragraph>Reservation Information</Paragraph>
      </Card.Content>
    </Card>
  );
};
