import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Text, ScrollView } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const BuildingTitle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => width * 0.95}px;
  margin: 10px;
  padding: 10px 5px 10px 5px;
  border: 1px solid #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const ClassRentReservation = function ({ navigation }) {
  const width = Dimensions.get('window').width;
  const buildings = [
    { id: 1, name: '대양 AI 센터' },
    { id: 2, name: '광개토관' },
    { id: 3, name: '율곡관' },
    { id: 4, name: '영실관' },
    { id: 5, name: '우정당' },
    { id: 6, name: '학술정보원' },
    { id: 7, name: '군자관' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    });
  });

  return (
    <ScrollView>
      <Container>
        {buildings.map((item) => {
          return (
            <BuildingTitle
              key={item.id}
              width={width}
              onPress={() => {
                navigation.navigate('Class Rent Notice', { name: item.name });
              }}
            >
              <Image
                style={{ width: 70, height: 70, marginLeft: 5 }}
                source={require('../../assets/dummy-image.jpeg')}
              />
              <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.name}</Text>
            </BuildingTitle>
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default ClassRentReservation;
