import React from 'react';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import RNPicker from 'react-native-picker-select';

const PickerText = styled.Text`
  margin: 5px 0px 3px 0px;
  font-size: 14px;
  text-align: center;
`;

const Picker = function ({ label, items, onValueChange = () => console.log('123'), value, disabled = false }) {
  return (
    <>
      <PickerText>{label}</PickerText>
      <RNPicker
        style={pickerStyles}
        placeholder={{
          label: '선택',
          value: null,
          color: 'gray',
        }}
        onValueChange={onValueChange}
        items={items}
        value={value}
        disabled={disabled}
      />
    </>
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

export default Picker;
