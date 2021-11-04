import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';

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
      <ScrollView contentContainerStyle={{hbackgroundColor: 'white' }}>
        <View style={{flex: 1, backgroundColor: 'white' }}>
        </View>
      </ScrollView>
      <FAB
        placement="right"
        icon={<Icon name="plus" type="material-community" color="white" />}
        buttonStyle={{ backgroundColor: '#007AFF' }}
        containterStyle={{ margin: 15 }}
        onPress={() => {
          navigation.navigate('Write Rent Inquiry')
        }}
      />
    </Container>
  );
};

export default RentInquiry;
