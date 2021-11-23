import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Image, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

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
  const [rentalFacilities, setRentalFacilities] = useState([]);

  useEffect(() => {
    const getRentalFacilities = async function () {
      try {
        const res = await axios.get(endPoint + 'rental');
        if (res.status === 200) {
          res.data.map((facility, idx) => {
            rentalFacilities.push({
              id: idx,
              name: facility,
            });
          });
          setRentalFacilities([...rentalFacilities]);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.error(err);
        Alert.alert('시설 로딩에 실패했습니다');
      }
    };

    getRentalFacilities();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
    });
  });

  return (
    <ScrollView>
      <Container>
        {rentalFacilities.map((item) => {
          return (
            <BuildingTitle
              key={item.id}
              width={width}
              onPress={() => {
                navigation.navigate('Rent Notice', { facilityName: item.name });
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

export default React.memo(RentReservation);
