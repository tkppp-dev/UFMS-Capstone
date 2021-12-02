import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Image, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { buildingImg } from '../../src/images'

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

const Rental = function ({ navigation }) {
  const width = Dimensions.get('window').width;
  const [rentalFacilities, setRentalFacilities] = useState([]);

  const getRentalFacilities = async function () {
    try {
      const res = await axios.get(endPoint + 'rental');
      const temp = []
      if (res.status === 200) {
        res.data.map((facility, idx) => {
          temp.push({
            id: idx,
            name: facility,
          });
        });
        setRentalFacilities(temp);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('시설 로딩에 실패했습니다');
    }
  };

  useEffect(() => {
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
                navigation.navigate('Rental Usage', { facilityName: item.name });
              }}
            >
              <Image
                style={{ width: 70, height: 70, marginLeft: 5 }}
                source={buildingImg[item.name]}
              />
              <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.name}</Text>
            </BuildingTitle>
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default React.memo(Rental);
