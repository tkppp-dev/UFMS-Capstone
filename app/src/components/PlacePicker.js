import React from 'react';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import Picker from './Picker';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0 15px 0;
`;

const PickerItem = styled.View`
  width: 48%;
`;

const PlacePicker = function () {
  return (
    <Container>
      <PickerItem>
        <Picker
          label="층"
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
        <Picker
          label="시설"
          items={[
            { label: 'XX1호', value: 'XX1' },
            { label: 'XX2호', value: 'XX2' },
            { label: 'XX3호', value: 'XX3' },
            { label: 'XX4호', value: 'XX4' },
          ]}
        />
      </PickerItem>
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
    borderRadius: 4,
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
    borderRadius: 4,
    color: 'black',
  },
});

export default PlacePicker;
