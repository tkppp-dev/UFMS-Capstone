import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import CustomButton from './CustomButton';
import { widthNavigation } from 'react-navigation'

const Container = styled(Collapse)`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  border-radius: 4px;
`;

const TitleText = styled.Text`
  padding: 0 10px 0 10px;
  font-size: 17px;
  color: ${({ type, color }) =>
    type === 'done-label' ? color.fontColor : 'black'};
`;

const InquiryAnswer = function ({ onPress }) {
  const [isAnswerDone, setIsAnswerDone] = useState(false);
  const doneLabelColor = [
    { name: 'answerYet', fontColor: '#FF4848' },
    { name: 'answerDone', fontColor: '#007AFF' },
  ];

  useEffect(() => {
    setIsAnswerDone(false);
  }, []);

  return (
    <Container>
      <CollapseHeader
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <View
          style={{
            borderEndWidth: 1,
            borderEndColor: 'gray',
            marginVertical: 20,
            marginHorizontal: 5,
          }}
        >
          <TitleText
            type={'done-label'}
            color={!isAnswerDone ? doneLabelColor[0] : doneLabelColor[1]}
          >
            {isAnswerDone ? '답변 완료' : '답변 미완료'}
          </TitleText>
        </View>
        <TitleText style={{ flex: 1 }}>문의 제목 문의 제목 문의 제목</TitleText>
      </CollapseHeader>
      <CollapseBody
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderTopColor: 'gray',
        }}
      >
        <Text style={{ fontSize: 16 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text style={{ marginTop: 25, marginBottom: 15, fontSize: 16 }}>
          문의 내용
        </Text>
        <Text style={{ marginBottom: 15, fontSize: 16 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <CustomButton
          label="다시 문의하기"
          onPress={onPress}
        />
      </CollapseBody>
    </Container>
  );
};

export default InquiryAnswer;