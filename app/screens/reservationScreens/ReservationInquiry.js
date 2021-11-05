import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import InquiryAnswer from '../../src/components/InquiryAnswer';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const RentInquiry = function ({ navigation }) {
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <Container>
      <ScrollView contentContainerStyle={{ hbackgroundColor: 'white' }}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <InquiryAnswer
            onPress={() => {
              navigation.navigate('Write Reservation Inquiry');
            }}
          />
          <InquiryAnswer
            onPress={() => {
              navigation.navigate('Write Reservation Inquiry');
            }}
          />
        </View>
      </ScrollView>
      <FAB
        placement="right"
        icon={<Icon name="plus" type="material-community" color="white" />}
        buttonStyle={{ backgroundColor: '#007AFF' }}
        containterStyle={{ margin: 15 }}
        onPress={() => {
          navigation.navigate('Write Reservation Inquiry');
        }}
      />
    </Container>
  );
};

export default RentInquiry;
