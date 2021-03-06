import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, ScrollView, View } from 'react-native';
import TextInputWithLabel from '../../src/components/TextInputWithLabel';
import CustomButton from '../../src/components/CustomButton';
import { Context } from '../../src/context';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`;

const SignUp = function ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkingPassword, setCheckingPassword] = useState('');
  const [passwordCheckNotice, setPasswordCheckNotice] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('01014549304');
  const [isPhoneAuthCompleted, setIsPhoneAuthCompleted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { state, dispatch } = useContext(Context);
  const width = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
    });
  });

  useEffect(() => {
    if (
      email.split('@').length === 2 &&
      passwordCheckNotice === '비밀번호가 일치합니다' &&
      password.length > 5 &&
      name.length > 0
    ) {
      if (isPhoneAuthCompleted) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  });

  useEffect(() => {
    if (checkingPassword.length > 0) {
      if (password === checkingPassword) {
        setPasswordCheckNotice('비밀번호가 일치합니다');
      } else {
        setPasswordCheckNotice('비밀번호가 일치하지 않습니다');
      }
    } else {
      setPasswordCheckNotice('');
    }
  }, [password, checkingPassword]);

  const _onPressSumbitButton = async function () {
    try {
      const res = await axios.post(endPoint + 'api/user/register', {
        email,
        password,
        username: name,
        mobile: '01028475392',
      });
      console.log(res.data)
      if (res.data.state === 200) {
        dispatch({ type: 'LOGIN', response: res.data.data });
        navigation.navigate('Home');
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      Alert.alert('회원가입에 실패했습니다');
      console.log(err);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: '100%', height: '100%' }}
    >
      <Container>
        <TextInputWithLabel
          label="이메일"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInputWithLabel
          label="비밀번호"
          onChangeText={(value) => setPassword(value)}
          type="password"
          notice="6자 이상 20자 이내"
        />
        <TextInputWithLabel
          label="비밀번호 확인"
          onChangeText={(value) => setCheckingPassword(value)}
          type="password_check"
          notice={passwordCheckNotice}
        />
        <TextInputWithLabel
          label="이름"
          onChangeText={(value) => setName(value)}
        />
        <TextInputWithLabel
          label="휴대폰 번호"
          value={phoneNumber}
          onChangeText={(value) => setPhoneNumber(value)}
          onPressAuthButton={() => setIsPhoneAuthCompleted(true)}
          placeholder="- 없이 입력"
          authentication={true}
        />
        <View style={{ width: width - 100, marginTop: 15 }}>
          <CustomButton
            label="회원가입 완료"
            onPress={_onPressSumbitButton}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
