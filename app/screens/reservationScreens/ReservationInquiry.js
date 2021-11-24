import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { ScrollView, View, Text, Alert } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import InquiryAnswer from '../../src/components/InquiryAnswer';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { Context } from '../../src/context';
import { InquiryContext, InquiryProvider } from '../../src/context/inquiry';
import { Provider } from 'react-native-paper';
import InquiryUpdateModal from '../../src/components/modal/InquiryUpdateModal';
import InquiryDeleteModal from '../../src/components/modal/InquiryDeleteModal';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const RentInquiry = function ({ navigation }) {
  const { state } = useContext(Context);
  const { inquiryState, dispatch } = useContext(InquiryContext);
  const [inquiryList, setInquiryList] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
    });
  });

  const getInquiryList = async function () {
    try {
      const res = await axios.get(endPoint + `inquiry/my/${state.user.id}`);
      if (res.status === 200) {
        const temp = [];
        res.data.map((inquiry, idx) => {
          temp.push({
            id: idx,
            inquiryId: inquiry.id,
            title: inquiry.title,
            author: inquiry.author,
            content: inquiry.content,
            date: new Date(inquiry.modifiedDate),
            isAnswerDone: false,
          });
        });
        setInquiryList([...temp]);
        dispatch({ type: 'SET_INQUIRY_LIST', inquiryList: temp });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 에러로 정보를 불러오지 못했습니다');
    }
  };

  useEffect(() => {
    getInquiryList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      getInquiryList();
    });
    return unsubscribe;
  }, [navigation]);

  const _updateInquiry = async function () {
    try {
      const params = {
        title: inquiryState.title,
        content: inquiryState.content,
      };
      console.log(params, inquiryState);
      const res = await axios.put(
        endPoint + `inquiry/${inquiryState.inquiryId}`,
        params
      );

      if (res.status === 200) {
        dispatch({ type: 'UPDATE_MODAL_DISMISS' });
        getInquiryList();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 에러로 문의 수정에 실패했습니다');
    }
  };

  const _deleteInquiry = async function () {
    try {
      const res = await axios.delete(
        endPoint + `inquiry/${inquiryState.inquiryId}`
      );

      if (res.status === 200) {
        dispatch({ type: 'DELETE_MODAL_DISMISS' });
        getInquiryList();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 에러로 문의 수정에 실패했습니다');
    }
  };

  return (
    <Provider>
      <Container>
        {inquiryList.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>문의 내역이 없습니다</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              {inquiryList.map((inquiry) => {
                return (
                  <InquiryAnswer
                    key={inquiry.inquiryId}
                    inquiryDetail={inquiry}
                    onPressUpdate={() => {}}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
        <FAB
          placement="right"
          icon={<Icon name="edit" type="antdesign" color="white" />}
          buttonStyle={{ backgroundColor: '#00AAFF' }}
          containterStyle={{ margin: 15 }}
          onPress={() => {
            navigation.navigate('Write Reservation Inquiry');
          }}
        />
        <InquiryUpdateModal updateInquiry={_updateInquiry} />
        <InquiryDeleteModal deleteInquiry={_deleteInquiry} />
      </Container>
    </Provider>
  );
};

export default React.memo(RentInquiry);
