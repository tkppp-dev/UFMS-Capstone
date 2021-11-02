import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions, Image, View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import PlacePicker from './PlacePicker'

const Container = styled.View`
  width: 95%;
  align-items: center;
  margin: 10px;
  border: 1px solid #D6DDE4;
  border-radius: 4px;
  background-color: white;
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

const SearchButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: #007AFF;
  border-radius: 4px;
`

const Building = function ({navigation, buildingData}) {
  const width = Dimensions.get('window').width;

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
            <PlacePicker />
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

export default Building;
