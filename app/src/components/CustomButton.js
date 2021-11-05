import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native' 

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
`;

const CustomButton = function ({ onPress, label }) {
  return (
    <Button onPress={onPress}>
      <Text style={{ color: 'white' }}>{label}</Text>
    </Button>
  );
};

export default CustomButton