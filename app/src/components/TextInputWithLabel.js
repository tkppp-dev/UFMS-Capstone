import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions, View, Alert } from 'react-native';
import axios from 'axios';
import { endPoint } from '../endPoint';

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
  const [messageSendButtonText, setMessageSendButtonText] =
    useState('인증번호 전송');
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [inputNumber, setInputNumber] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const _sendAuthResquest = async function () {
    try {
      const res = await axios.post(
        endPoint + 'api/user/register/mobile',
        null,
        {
          params: { toNumber: value },
        }
      );
      setVerifyNumber(res.data);
      setMessageSendButtonText('인증번호 재전송');
    } catch (err) {
      console.error(err);
    }
  };

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
          autoCapitalize={'none'}
          autoCorrect={false}
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
          style={{ opacity: buttonDisabled ? 0.5 : 1 }}
          disabled={buttonDisabled}
          onPress={_sendAuthResquest}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {messageSendButtonText}
          </Text>
        </AuthenticatoinButton>
      ) : null}
      {verifyNumber === null ? null : (
        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="인증번호 입력"
            onChangeText={(value) => setInputNumber(value)}
            maxLength={4}
            keyboardType="number-pad"
          />
          <AuthenticatoinButton
            onPress={() => {
              if (verifyNumber == inputNumber) {
                //check api 어따 쓰는지 문의
                Alert.alert('휴대폰 인증에 성공했습니다');
                onPressAuthButton();
                setIsAuthCompleted(true);
                setVerifyNumber(null);
                setButtonDisabled(true)
              } else {
                Alert.alert('휴대폰 인증에 실패했습니다.');
              }
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>인증</Text>
          </AuthenticatoinButton>
        </View>
      )}
    </Container>
  );
};

export default TextInputWithLabel;
