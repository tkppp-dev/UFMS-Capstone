import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

const Container = styled.View`
  
`

const UsageDetail = function(){
  return (
    <Container>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Title>10:30AM~12:00PM</Title>
          <Paragraph>
          <View>
            <Text>asdfasdf</Text>
          </View>
        </Paragraph>
        </Card.Content>
      </Card>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Title>12:00PM~13:30PM</Title>
          <Paragraph>
            Reservation Information
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Title>13:30PM~15:00PM</Title>
          <Paragraph>
            Reservation Information
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Title>17:00PM~18:00PM</Title>
          <Paragraph>
            Reservation Information
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Title>18:00PM~20:00PM</Title>
          <Paragraph>
            Reservation Information
          </Paragraph>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default UsageDetail