import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import PlacePicker from '../../src/components/PlacePicker';
import { buildingImg } from '../../src/images';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

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
  background-color: #007aff;
`;

const NoticeItem = function ({ notice }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Text>{' - '}</Text>
      </View>
      <Text style={{ flex: 1 }}>{notice}</Text>
    </View>
  );
};

const ClassRentNotice = function ({ navigation, route }) {
  const window = Dimensions.get('window');
  const building = route.params.building;
  const [floor, setFloor] = useState(null);
  const [facility, setFacility] = useState(null);
  const [buildingData, setBuildingData] = useState('');

  const getBuilding = async function () {
    try {
      const res = await axios.get(endPoint + 'building');
      console.log(res.data)
      const temp = []
      res.data.map((item, idx) => {
        if(item.name === building.name){
          setBuildingData(item)
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getBuilding();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '강의실 예약 유의사항',
    });
  });

  const _onPressReservation = function () {
    if (floor === null || facility === null) {
      Alert.alert('층과 시설을 모두 선택해 주세요');
    } else {
      navigation.navigate('Class Rent Application', {
        facility,
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Container>
        <Image
          style={{
            marginVertical: 20,
            width: window.width * 0.9,
            height: window.height * 0.25,
          }}
          source={buildingImg[building.name]}
        />
        <Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {building.name}
          </Text>
          <Text style={{ marginTop: 10 }}>{buildingData.description}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
            강의실 예약 유의 사항
          </Text>
          <View style={{ marginTop: 10 }}>
            <NoticeItem notice="예약 변경시 시간대와 날짜 변경은 불가능하며 필요시 예약 취소호 재예약이 필요합니다."/>
            <NoticeItem notice="예약은 90분 단위로 가능하며 그 이상 예약이 필요할시 다음 시간대를 같이 예약해야합니다." />
          </View>
          <PlacePicker
            buildingData={building}
            setFloor={setFloor}
            setFacility={setFacility}
          />
          <View style={{ alignItems: 'center' }}>
            <Button onPress={_onPressReservation}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                강의실 예약
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    </ScrollView>
  );
};

export default ClassRentNotice;
