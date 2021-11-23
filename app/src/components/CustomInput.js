import React from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions } from 'react-native';

const Container = styled.View`
  width: 100%;
  margin: 5px 0 15px 0;
`;
const Label = styled.Text`
  color: black;
  margin-bottom: 10px;
  padding-left: 5px;
`;

const Input = styled.TextInput.attrs((props) => {
  return {
    placeholder: props.placeholder,
    placeholderTextColor: 'gray',
    autoCapitalize: 'none',
    returnKeyType: 'done',
  };
})`
  width: 100%;
  height: ${({ type }) => (type === 'textarea' ? 100 : 42)}px;
  padding: 10px;
  border: 1px;
  border-color: #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const Notice = styled.Text`
  margin-top: 5px;
  padding-left: 5px;
  color: black;
`;

const CustomInput = function ({
  label,
  value = '',
  multiline = false,
  placeholder,
  notice,
  onChangeText,
  type
}) {
  const width = Dimensions.get('window').width;

  return (
    <Container width={width}>
      <Label>{label}</Label>
      <Input
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        autoCapitalize={'none'}
        autoCorrect={false}
        type={type}
      />
      {notice !== undefined ? <Notice>{notice}</Notice> : null}
    </Container>
  );
};

export default CustomInput;
