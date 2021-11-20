import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
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


const RentReservation = function ({ navigation }) {
  const width = Dimensions.get('window').width;
  const buildings = [
    {
      id: 1,
      name: '대양홀',
      activityType: ['공연', '상연', '특강'],
      location: { name: '대양홀', floor: 1 },
      availableTime: [{ name: '평일', start: '09:00', end: '17:00'}],
      maxCapacity: 2500,
      areaSize: 1732,
      facility: ['음향', '빔', '스크린'],
      etc: []
    },
    {
      id: 2,
      name: '소극장',
      activityType: ['공연'],
      location: { name: '광개토관', floor: 15 },
      availableTime: [{ name: '평일', start: '09:00', end: '21:00'}],
      maxCapacity: 100,
      areaSize: 207,
      facility: ['음향'],
      etc: ['동아리연합회 문의 Tel)02-3408-3379']
    },
    {
      id: 3,
      name: '전시실',
      activityType: ['전시'],
      location: { name: '광개토관', floor: -1 },
      availableTime: [{ name: '평일', start: '09:00', end: '17:00'}],
      maxCapacity: null,
      areaSize: 1220,
      facility: ['음향'],
      etc: ['갤러리 조교실 문의 Tel)02-3408-4164']
    },
    {
      id: 4,
      name: '애지헌 교회',
      activityType: ['특강'],
      location: { name: '애지헌', floor: 1 },
      availableTime: [{ name: '평일', start: '09:00', end: '17:00'}],
      maxCapacity: null,
      areaSize: 207,
      facility: ['음향'],
      etc: ['애지헌 조교실 문의 Tel)02-3408-3538']
    },
    {
      id: 5,
      name: '운동장',
      activityType: ['체육활동'],
      location: { name: '운동장', floor: null },
      availableTime: [{ name: '평일', start: '09:00', end: '21:00'}, { name: '주말', start: '09:00', end: '18:00'}],
      maxCapacity: 100,
      areaSize: 207,
      facility: ['체육시설'],
      etc: ['체육학과 조교실 문의 Tel)02-3408-3325', '야간조명 사용시 시설과 문의 Tel)02-3408-3379']
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
    });
  });

  return (
    <Container>
      {buildings.map((item) => {
        return (
          <BuildingTitle
            key={item.id}
            width={width}
            onPress={() => {
              navigation.navigate('Rent Notice', { facilityData: item });
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
  );
};

export default RentReservation;
