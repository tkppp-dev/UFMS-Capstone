import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import TextInputWithLabel from '../src/components/TextInputWithLabel';
import ButtonGroup from '../src/components/CustomButtonGroup';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`;

const SignUp = function ({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center'
    });
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: '100%', height: '100%' }}
    >
      <Container>
        <TextInputWithLabel label="아이디" />
        <TextInputWithLabel
          label="비밀번호"
          type="password"
          notice="6자 이상 20자 이내"
        />
        <TextInputWithLabel label="비밀번호 확인" type="password" notice="" />
        <TextInputWithLabel label="이메일" />
        <ButtonGroup label="성별" buttonItems={['남자', '여자']} />
        <TextInputWithLabel
          label="휴대폰 번호"
          placeholder="- 없이 입력"
          authentication={true}
        />
        <ButtonGroup
          label="가입자"
          buttonItems={['교수', '학생', '외부 이용자']}
        />
        <TextInputWithLabel label="교내 식별자" authentication={true} />
      </Container>
    </ScrollView>
  );
};

export default SignUp;
