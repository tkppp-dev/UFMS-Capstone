import React, { useState, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image } from 'react-native';
import { images } from '../src/images';
import axios from 'axios'
import { Context } from '../src/context/index'
import { CommonActions } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
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
  border-color: #D6DDE4;
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
`

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
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : '20px')};
`;

const SignInScreen = function ({ navigation }) {
  const { state, dispatch } = useContext(Context)
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const width = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center'
    });
  });

  const _onPressSignUp = function () {
    navigation.navigate('회원가입');
  };

  const _onPressLogin = async function(){
    // const res = await axios.post('/login', {id, password})
    const res = 'success'

    if(res === 'success'){
      dispatch({ type : 'LOGIN' })
      navigation.dispatch(CommonActions.navigate('Home'))
    }else{
      alert('아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <Container>
      <StyledInput
        width={width}
        placeholder={'아이디 입력'}
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <StyledInput
        width={width}
        placeholder={'비밀번호 입력'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{marginBottom: 10}}
      />
      <LoginButton width={width} onPress={_onPressLogin}>
        <StyledText color="white">Sign In</StyledText>
      </LoginButton>
      <SocialLoginButton width={width}>
        <Image source={images.google} style={{ width: 45, height: 45 }} />
        <StyledText style={{ flex: 1, textAlign: 'center' }} color="white">
          Sign In with Google
        </StyledText>
      </SocialLoginButton>
      <SignUpButton onPress={_onPressSignUp}>
        <StyledText color="#007AFF" fontSize="18">
          Sign Up
        </StyledText>
      </SignUpButton>
    </Container>
  );
};

export default SignInScreen;
