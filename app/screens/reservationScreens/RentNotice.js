import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import PlacePicker from '../../src/components/PlacePicker';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const Content = styled.View`
  width: 89%;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007AFF;
`

const RentNotice = function ({ navigation, route }) {
  const name = route.params.name;
  const window = Dimensions.get('window');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Container>
        <Image
          style={{
            marginVertical: 20,
            width: window.width * 0.9,
            height: window.height * 0.25,
          }}
          source={require('../../assets/dummy-image.jpeg')}
        />
        <Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
            대관 유의 사항
          </Text>
          <Text style={{ marginTop: 10 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <PlacePicker />
          <View style={{ alignItems: 'center' }}>
            <Button onPress={() => {
              navigation.navigate('Rent Application', { placeName : name })
            }}>
              <Text style={{ color: 'white' }}>대관 신청</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </ScrollView>
  );
};

export default RentNotice;
