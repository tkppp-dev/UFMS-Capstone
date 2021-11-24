import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { InquiryContext } from '../context/inquiry';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

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

const CustomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 8px 8px;
`;

const UpdateButton = styled(CustomButton)`
  background-color: #007aff;
`;

const DeleteButton = styled(CustomButton)`
  background-color: red;
`;

const InquiryAnswer = function ({ inquiryDetail }) {
  const [inquiryDate, setInquiryDate] = useState(null);
  const { inquiryState, dispatch } = useContext(InquiryContext);

  useEffect(() => {
    setInquiryDate(getDateString(inquiryDetail.date));
  }, []);

  const doneLabelColor = [
    { name: 'answerYet', fontColor: '#FF4848' },
    { name: 'answerDone', fontColor: '#007AFF' },
  ];

  const getDateString = function (dt) {
    return `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`;
  };

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
            color={
              !inquiryDetail.isAnswerDone
                ? doneLabelColor[0]
                : doneLabelColor[1]
            }
          >
            {inquiryDetail.isAnswerDone ? '답변 완료' : '답변 미완료'}
          </TitleText>
        </View>
        <TitleText style={{ flex: 1 }}>{inquiryDetail.title}</TitleText>
      </CollapseHeader>
      <CollapseBody
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderTopWidth: 1,
          borderTopColor: 'gray',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>문의 내용</Text>
          <Text style={{ fontSize: 16 }}>작성일 - {inquiryDate}</Text>
        </View>
        <Text style={{ fontSize: 16 }}>{inquiryDetail.content}</Text>
        {inquiryDetail.isAnswerDone ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                문의 답변
              </Text>
              <Text style={{ fontSize: 16 }}>
                답변일 - {inquiryDetail.answerDate}
              </Text>
            </View>
            <Text style={{ fontSize: 16 }}>{inquiryDetail.answer}</Text>
          </>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 15,
          }}
        >
          {!inquiryDetail.isAnswerDone ? (
            <UpdateButton
              onPress={() => {
                dispatch({
                  type: 'SET_INQUIRY',
                  idx: inquiryDetail.id,
                  inquiryId: inquiryDetail.inquiryId,
                  title: inquiryDetail.title,
                  content: inquiryDetail.content,
                });
                dispatch({ type: 'UPDATE_MODAL_VISIBLE' });
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}
              >
                문의 수정
              </Text>
            </UpdateButton>
          ) : null}
          <DeleteButton
            style={{ marginStart: 10 }}
            onPress={() => {
              dispatch({
                type: 'SET_INQUIRY_ID',
                inquiryId: inquiryDetail.inquiryId,
              });
              dispatch({ type: 'DELETE_MODAL_VISIBLE' });
            }}
          >
            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>
              문의 삭제
            </Text>
          </DeleteButton>
        </View>
      </CollapseBody>
    </Container>
  );
};

export default InquiryAnswer;
