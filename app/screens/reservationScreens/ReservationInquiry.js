import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Text } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import InquiryAnswer from '../../src/components/InquiryAnswer';
import axios from 'axios';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const RentInquiry = function ({ navigation }) {
  const [inquiryList, setInquiryList] = useState([
    {
      id: 1,
      title: '대양홀 대관 문의',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      date: '2021/11/14',
      isAnswerDone: false,
    },
    {
      id: 2,
      title: '대양홀 대관 문의',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      date: '2021/11/14',
      isAnswerDone: true,
      answerDate : '2021/11/16',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const getInquiryList = async function () {
      return await axios.get('http://127.0.0.1:8080/inquiry');
    };
  }, []);

  return (
    <Container>
      {inquiryList.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18 }}>문의 내역이 없습니다</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {inquiryList.map((inquiry) => {
              return (
                <InquiryAnswer
                  key={inquiry.id}
                  onPress={() => {
                    navigation.navigate('Write Reservation Inquiry');
                  }}
                  inquiryDetail={inquiry}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <FAB
        placement="right"
        icon={<Icon name="plus" type="material-community" color="white" />}
        buttonStyle={{ backgroundColor: '#00AAFF' }}
        containterStyle={{ margin: 15 }}
        onPress={() => {
          navigation.navigate('Write Reservation Inquiry');
        }}
      />
    </Container>
  );
};

export default RentInquiry;
