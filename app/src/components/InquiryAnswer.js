import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Text, View } from 'react-native';
import { InquiryContext } from '../context/inquiry';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

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
  const { inquiryState, dispatch } = useContext(InquiryContext);
  const [inquiryDate, setInquiryDate] = useState(null);
  const [answerData, setAnswerData] = useState([]);
  const [isAnswerDone, setIsAnswerDone] = useState(false);

  const getAnswer = async function () {
    try {
      const res = await axios.get(
        endPoint + `inquiry/${inquiryDetail.inquiryId}/comment`
      );
      if (res.status === 200) {
        const temp = res.data.map((item) => {
          const dt = item.modifiedDate.split('T')[0]
          item.modifiedDate = dt.replaceAll('-','/')
          return item;
        });
        setAnswerData(temp);
        if (res.data.length > 0) {
          setIsAnswerDone(true);
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  useEffect(() => {
    setInquiryDate(getDateString(inquiryDetail.date));
    getAnswer();
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
              !isAnswerDone
                ? doneLabelColor[0]
                : doneLabelColor[1]
            }
          >
            {isAnswerDone ? '답변 완료' : '답변 미완료'}
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
        {answerData.map((item, idx) => (
          <View key={idx}>
            {isAnswerDone ? (
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
                    답변일 - {item.modifiedDate}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, paddingTop: 15 }}>{item.content}</Text>
              </>
            ) : null}
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 15,
          }}
        >
          {!isAnswerDone ? (
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
