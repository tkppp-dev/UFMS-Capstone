import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image } from 'react-native';
import { images } from '../src/images';

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

const SubmitButton = styled(Button)`
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
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const width = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center'
    });
  });

  const onPressSignUp = function () {
    navigation.navigate('회원가입');
  };

  return (
    <Container>
      <StyledInput
        width={width}
        placeholder={'Enter ID'}
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <StyledInput
        width={width}
        placeholder={'Enter Password'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{marginBottom: 10}}
      />
      <SubmitButton width={width}>
        <StyledText color="white">Sign In</StyledText>
      </SubmitButton>
      <SocialLoginButton width={width}>
        <Image source={images.google} style={{ width: 45, height: 45 }} />
        <StyledText style={{ flex: 1, textAlign: 'center' }} color="white">
          Sign In with Google
        </StyledText>
      </SocialLoginButton>
      <SignUpButton onPress={onPressSignUp}>
        <StyledText color="#007AFF" fontSize="18">
          Sign Up
        </StyledText>
      </SignUpButton>
    </Container>
  );
};

export default SignInScreen;
