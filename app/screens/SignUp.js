import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, View } from 'react-native';
import TextInputWithLabel from '../src/components/TextInputWithLabel';
import ButtonGroup from '../src/components/CustomButtonGroup';
import CustomButton from '../src/components/CustomButton';

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
  const [userType, setUserType] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identifierNumber, setIdentifierNumber] = useState('');
  const [isPhoneAuthCompleted, setIsPhoneAuthCompleted] = useState(false);
  const [isIdentifierAuthCompleted, setIsIdentifierAuthCompleted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const userTypeList = ['교수', '학생', '외부 이용자'];
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
        if (userType === '외부 이용자') {
          setDisabled(false);
        } else {
          if (isIdentifierAuthCompleted) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        }
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
        <ButtonGroup
          label="가입자"
          buttonItems={userTypeList}
          onPress={(idx) => {
            setUserType(userTypeList[idx]);
          }}
        />
        {userType === '교수' || userType === '학생' ? (
          <TextInputWithLabel
            label="교내 식별자"
            value={identifierNumber}
            onChangeText={(value) => setIdentifierNumber(value)}
            onPressAuthButton={() => setIsIdentifierAuthCompleted(true)}
            authentication={true}
          />
        ) : null}
        <View style={{ width: width - 100, marginTop: 15 }}>
          <CustomButton label="회원가입 완료" disabled={disabled} />
        </View>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
