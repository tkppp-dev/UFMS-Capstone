import axios from 'axios';
import React, { useState, useLayoutEffect, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import CustomButton from '../../src/components/CustomButton';
import { Context } from '../../src/context';
import { endPoint } from '../../src/endPoint';

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const InquiryContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 15px;
  background-color: white;
`;

const Label = styled.Text`
  padding-left: 4px;
  margin-bottom: 8px;
  font-size: 16px;
`;

const Input = styled.TextInput.attrs((props) => {
  return {
    autoCapitalize: 'none',
    autoCorrect: false,
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

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
`;

const RentInquiry = function ({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { state } = useContext(Context);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '문의 작성',
    });
  });

  const _onPressButton = async function () {
    try {
      await axios.post(
        endPoint + 'inquiry',
        {
          title,
          content,
          author: state.user.username,
        },
        {
          accessToken: state.user.accessToken,
        }
      );
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert('에상치 못한 에러로 문의 작성을 완료하지 못했습니다');
    }
  };

  return (
    <Container>
      <InquiryContainer>
        <Label>문의 제목</Label>
        <Input
          style={{ marginBottom: 16 }}
          onChangeText={(value) => setTitle(value)}
        />
        <Label>문의 내용</Label>
        <Input
          style={{ flex: 1, marginBottom: 16, justifyContent: 'flex-start' }}
          a
          onChangeText={(value) => setContent(value)}
          multiline={true}
          type="content"
        />
        <CustomButton label="완료" onPress={_onPressButton} />
      </InquiryContainer>
    </Container>
  );
};

export default RentInquiry;
