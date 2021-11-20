import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Alert } from 'react-native';
import { images } from '../../src/images';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { Context } from '../../src/context';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.TextInput.attrs((props) => {
  return {
    placeholder: props.placeholder,
    placeholderTextColor: 'gray',
    autoCapitalize: 'none',
    returnKeyType: 'done',
  };
})`
  width: ${(props) => props.width - 100}px;
  height: 45px;
  padding: 10px;
  margin: 5px;
  border: 1px;
  border-color: #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  width: ${(props) => props.width - 100}px;
  height: 45px;
  margin-top: 10px;
  background-color: #007aff;
  border-radius: 4px;
`;

const LoginButton = styled(Button)`
  justify-content: center;
`;

const SocialLoginButton = styled(Button)`
  flex-direction: row;
`;

const SignUpButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`;

const StyledText = styled.Text`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : '18px')};
`;

const SignInScreen = function ({ navigation }) {
  const [email, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isCompleted, setIsCompleted] = useState({
    email: false,
    password: false,
  });
  const { state, dispatch } = useContext(Context);
  const width = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
    });
  });

  useEffect(() => {
    const format = email.split('@');
    if (format.length === 2) {
      isCompleted.email = true;
    } else {
      isCompleted.email = 'FORMAT_ERROR';
    }
    setIsCompleted({ ...isCompleted });
  }, [email]);

  useEffect(() => {
    if (password.length >= 6) {
      isCompleted.password = true;
      setIsCompleted({ ...isCompleted });
    }
  }, [password]);

  const _onPressSignUp = function () {
    navigation.navigate('회원가입');
  };

  const _onPressLogin = async function () {
    let flag = 0;
    for (let key in isCompleted) {
      if (isCompleted[key] !== true) flag = 1;
    }
    if (flag === 0) {
      try {
        const res = await axios.post('http://127.0.0.1:8080/api/auth/login', {
          email,
          password,
        });
        if (res.data.state === 200) {
          dispatch({ type: 'LOGIN', response: res.data.data });
          navigation.dispatch(CommonActions.navigate('Home'));
        }
        else{
          throw new Error()
        }
      } catch (err) {
        console.log(err);
        Alert.alert('아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.');
      }
    } else {
      if (isCompleted.id === 'FORMAT_ERROR') {
        Alert.alert('이메일 형식이 올바르지 않습니다.');
      } else {
        Alert.alert('이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  return (
    <Container>
      <StyledInput
        width={width}
        placeholder={'이메일 입력'}
        value={email}
        onChangeText={(text) => setId(text)}
      />
      <StyledInput
        width={width}
        placeholder={'비밀번호 입력'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{ marginBottom: 10 }}
      />
      <LoginButton width={width} onPress={_onPressLogin}>
        <StyledText color="white">로그인</StyledText>
      </LoginButton>
      <SocialLoginButton width={width}>
        <Image source={images.google} style={{ width: 45, height: 45 }} />
        <StyledText style={{ flex: 1, textAlign: 'center' }} color="white">
          구글 아이디로 로그인
        </StyledText>
      </SocialLoginButton>
      <SignUpButton onPress={_onPressSignUp}>
        <StyledText color="#007AFF" fontSize="16">
          회원가입
        </StyledText>
      </SignUpButton>
    </Container>
  );
};

export default SignInScreen;
