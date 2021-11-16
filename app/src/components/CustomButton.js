import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ color }) => (color !== undefined ? color : '#007aff')};
`;

const CustomButton = function ({
  onPress,
  label,
  disabled,
  color,
  fontColor,
  border,
  borderColor
}) {
  return (
    <Button
      onPress={onPress}
      color={color}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        borderWidth: border ? 1 : 0,
        borderColor: borderColor !== undefined ? borderColor : 'gray',
      }}
    >
      <Text
        style={{
          color: fontColor !== undefined ? fontColor : 'white',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
    </Button>
  );
};

export default CustomButton;
