import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions, View } from 'react-native';

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
  border-color: #d6dde4;
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
  value,
  placeholder,
  notice,
  authentication,
  onChangeText,
  onPressAuthButton,
}) {
  const width = Dimensions.get('window').width;
  const [isAuthCompleted, setIsAuthCompleted] = useState(false);

  return (
    <Container width={width}>
      <Label>{label}</Label>
      {!isAuthCompleted ? (
        <Input
          placeholder={placeholder}
          secureTextEntry={
            type === 'password' || type === 'password_check' ? true : false
          }
          onChangeText={onChangeText}
        />
      ) : (
        <View
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#d6dde4',
            padding: 10,
            height: 42,
          }}
        >
          <Text>{value}</Text>
        </View>
      )}
      {notice !== undefined ? (
        <Notice
          style={{
            color:
              notice === '비밀번호가 일치합니다'
                ? '#007AFF'
                : type === 'password_check'
                ? 'red'
                : 'black',
          }}
        >
          {notice}
        </Notice>
      ) : null}
      {authentication ? (
        <AuthenticatoinButton
          onPress={() => {
            onPressAuthButton();
            setIsAuthCompleted(true);
          }}
        >
          <Text style={{ color: 'white' }}>인증</Text>
        </AuthenticatoinButton>
      ) : null}
    </Container>
  );
};

export default TextInputWithLabel;
