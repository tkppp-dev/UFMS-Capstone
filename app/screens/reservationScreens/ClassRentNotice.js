import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native';
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
  background-color: #007aff;
`;

const ClassRentNotice = function ({ navigation, route }) {
  const window = Dimensions.get('window');
  const building = route.params.building;
  const [floor, setFloor] = useState(null);
  const [facililty, setFacility] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '강의실 예약 유의사항',
    });
  });

  const _onPressReservation = function () {
    if (floor === null || facililty === null) {
      Alert.alert('층과 시설을 모두 선택해 주세요');
    } else {
      navigation.navigate('Class Rent Application', {
        facililty,
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
          source={require('../../assets/dummy-image.jpeg')}
        />
        <Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {building.name}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
            강의실 예약 유의 사항
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
          <PlacePicker
            buildingData={building}
            setFloor={setFloor}
            setFacility={setFacility}
          />
          <View style={{ alignItems: 'center' }}>
            <Button
              onPress={_onPressReservation}
            >
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
