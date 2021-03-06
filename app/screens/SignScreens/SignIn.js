import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Alert } from 'react-native';
import { images } from '../../src/images';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { Context } from '../../src/context';
import { endPoint } from '../../src/endPoint';

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
    autoCorrect: false,
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
    navigation.navigate('????????????');
  };

  const _onPressLogin = async function () {
    let flag = 0;
    for (let key in isCompleted) {
      if (isCompleted[key] !== true) flag = 1;
    }
    if (flag === 0) {
      try {
        const res = await axios.post(endPoint + 'api/auth/login', {
          email,
          password,
        });
        console.log(res.data)
        if (res.data.state === 200) {
          dispatch({ type: 'LOGIN', response: res.data.data });
          navigation.dispatch(CommonActions.navigate('Home'));
        }
        else{
          throw new Error()
        }
      } catch (err) {
        console.log(err);
        Alert.alert('????????? ?????? ????????? ???????????? ??????????????????');
      }
    } else {
      if (isCompleted.id === 'FORMAT_ERROR') {
        Alert.alert('????????? ????????? ???????????? ????????????');
      } else {
        Alert.alert('???????????? ???????????? ????????? ??????????????? ???????????? ????????????');
      }
    }
  };

  return (
    <Container>
      <StyledInput
        width={width}
        placeholder={'????????? ??????'}
        value={email}
        onChangeText={(text) => setId(text)}
      />
      <StyledInput
        width={width}
        placeholder={'???????????? ??????'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{ marginBottom: 10 }}
      />
      <LoginButton width={width} onPress={_onPressLogin}>
        <StyledText color="white">?????????</StyledText>
      </LoginButton>
      <SignUpButton onPress={_onPressSignUp}>
        <StyledText color="#007AFF" fontSize="16">
          ????????????
        </StyledText>
      </SignUpButton>
    </Container>
  );
};

export default SignInScreen;
