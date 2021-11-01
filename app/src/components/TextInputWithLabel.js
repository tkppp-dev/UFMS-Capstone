import React from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions } from 'react-native';

const Container = styled.View`
  width: ${(props) => props.width - 100}px;
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
  height: 42px;
  padding: 10px;
  border: 1px;
  border-color: #D6DDE4;
  border-radius: 4px;
  background-color: white;
`;

const Notice = styled.Text`
  margin-top: 5px;
  padding-left: 5px;
  color: black;
`;

const AuthenticatoinButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #007aff;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 4px;
`;

const TextInputWithLabel = function ({
  label,
  type,
  placeholder,
  notice,
  authentication,
}) {
  const width = Dimensions.get('window').width;

  return (
    <Container width={width}>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        secureTextEntry={type === 'password' ? true : false}
      />
      {notice !== undefined ? <Notice>{notice}</Notice> : null}
      {authentication ? (
        <AuthenticatoinButton>
          <Text style={{color: 'white'}}>인증</Text>
        </AuthenticatoinButton>
      ) : null}
    </Container>
  );
};

export default TextInputWithLabel;
