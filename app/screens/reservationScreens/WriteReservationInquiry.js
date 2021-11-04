import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const InquiryContainer = styled.View`
  flex: 1;
  width: 95%;
  margin: 10px;
  padding: 15px;
  background-color: white;
`;

const Label = styled.Text`
  padding-left: 4px;
  margin-bottom: 8px;
  font-size: 16px;
`

const Input = styled.TextInput.attrs((props) => {
  return {
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

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
`;

const RentInquiry = function ({ navigation }) {
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  
  return (
    <Container>
      <InquiryContainer>
        <Label>
          문의 제목
        </Label>
        <Input style={{ marginBottom: 16}} />
        <Label>
          문의 내용
        </Label>
        <Input
          style={{ flex: 1, marginBottom: 16 }}
          multiline={true}
        />
        <Button>
          <Text style={{ color: 'white' }}>완료</Text>
        </Button>
      </InquiryContainer>
    </Container>
  );
};

export default RentInquiry;
