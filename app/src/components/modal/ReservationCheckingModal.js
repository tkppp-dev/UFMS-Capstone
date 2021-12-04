import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { Context } from '../../context/index';
import { endPoint } from '../../endPoint';
import CustomButton from '../CustomButton';
import InformationItem from '../InformationItem';
import axios from 'axios';

const ReservationCheckingModal = function ({
  visible,
  onDismiss,
  facility,
  reservationName,
  purpose,
  startTime,
  endTime,
  date,
  navigation
}) {
  const { state } = useContext(Context);
  const _onPress = async function () {
    try {
      const params = {
        memberId: state.user.id,
        facility,
        reservationName,
        notice: purpose,
        startTime: startTime.getISOString(date),
        endTime: endTime.getISOString(date),
      };
      console.log(params);

      const res = await axios.post(endPoint + 'reservation/', params);
      if (res.status === 200) {
        onDismiss(false);
        navigation.reset({
          routes: [{ name: 'Home', param: {} }],
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      Alert.alert('예기치 못한 문제로 예약에 실패했습니다');
      console.error(err);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      }}
    >
      <View style={{ width: '90%' }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          예약 정보를 확인하세요
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <InformationItem title="예약시설" body={facility} row={true} />
          <InformationItem
            title="예약일자"
            body={`${date.year}-${date.month}-${date.day}`}
            row={true}
          />
        </View>
        <InformationItem
          title="예약시간"
          body={`${startTime.toString()} - ${endTime.toString()}`}
        />
        <View style={{ marginTop: 10 }} />
        <CustomButton
          onPress={_onPress}
          label="예약완료"
        />
      </View>
    </Modal>
  );
};

export default ReservationCheckingModal;
