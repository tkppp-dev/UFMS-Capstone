import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dimensions, Image, View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const Container = styled.View`
  width: 95%;
  align-items: center;
  margin: 10px;
  border: 1px solid black;
`;

const HeaderView = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => width * 0.95 - 10}px;
  margin: 10px;
`;

const BodyView = styled.View`
  width: ${({ width }) => width * 0.95 - 10}px;
  margin: 0 10px 10px 10px;
  padding: 5px;
  border-top-width: 1px;
  border-color: grey;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 10px 0 10px 0;
`;

const PickerItem = styled.View`
  width: 40%;
`;

const PickerText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const SearchButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  background-color: #007AFF;
  border-radius: 8px;
`

const Building = function ({navigation, buildingData}) {
  const width = Dimensions.get('window').width;
  const placeholder = {
    label: '',
    value: null,
    color: 'grey',
  };

  return (
    <Container width={width}>
      <Collapse>
        <CollapseHeader>
          <HeaderView width={width}>
            <Image
              style={{ width: 70, height: 70, marginLeft: 5 }}
              source={require('../../assets/dummy-image.jpeg')}
            />
            <Text style={{ marginLeft: 10, fontSize: 20 }}>{buildingData.name}</Text>
          </HeaderView>
        </CollapseHeader>
        <CollapseBody>
          <BodyView width={width}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <PickerContainer>
              <PickerItem>
                <PickerText>층 선택</PickerText>
                <RNPickerSelect
                  style={pickerStyles}
                  placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: '지하 2층', value: -2 },
                    { label: '지하 1층', value: -1 },
                    { label: '1층', value: 1 },
                    { label: '2층', value: 2 },
                    { label: '3층', value: 3 },
                  ]}
                />
              </PickerItem>
              <PickerItem>
                <PickerText>시설 선택</PickerText>
                <RNPickerSelect
                  style={pickerStyles}
                  placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: 'XX1호', value: 'XX1' },
                    { label: 'XX2호', value: 'XX2' },
                    { label: 'XX3호', value: 'XX3' },
                    { label: 'XX4호', value: 'XX4' },
                  ]}
                />
              </PickerItem>
            </PickerContainer>
            <View style={{alignItems: 'center'}}>
              <SearchButton onPress={() => navigation.navigate('Facility Usage', {facilityName: buildingData.name})}>
                <Text style={{color : 'white', fontSize: 16}}>사용 현황 조회</Text>
              </SearchButton>
            </View>
          </BodyView>
        </CollapseBody>
      </Collapse>
    </Container>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
  },
});

export default Building;
