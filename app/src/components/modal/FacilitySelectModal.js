import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { endPoint } from '../../endPoint';
import CustomButton from '../CustomButton';
import PlacePicker from '../PlacePicker';

const FacilitySelectModal = function ({ visible, onDismiss, buildingData, setItems }) {
  const [floor, setFloor] = useState(null);
  const [facility, setFacility] = useState(null);

  const getTimeStr = function (startTime, endTime) {
    const start = startTime.split('T')[1].split(':');
    const end = endTime.split('T')[1].split(':');

    const date = startTime.split('T')[0];
    const time = `${start[0]}:${start[1]}~${end[0]}:${end[1]}`;

    return {
      date,
      time,
    };
  };

  const onPressSearchBtn = async function () {
    try {
      if (facility === null) {
        Alert.alert('시설을 선택해주세요');
      } else {
        const res = await axios.get(endPoint + `reservation/check/${facility}`);

        if (res.status === 200) {
          setItems({})
          const items = {};
          res.data.forEach((item) => {
            const { date, time } = getTimeStr(item.startTime, item.endTime);
            if(items[date] === undefined){
              items[date] = []
            }
            items[date].push({ ...item, time });
          });
          setItems(items)
          onDismiss()
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
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
          시설 선택
        </Text>
        <PlacePicker
          buildingData={buildingData}
          setFloor={setFloor}
          setFacility={setFacility}
        />
        <View style={{ marginTop: 10 }} />
        <CustomButton label="조회" onPress={onPressSearchBtn} />
      </View>
    </Modal>
  );
};

export default FacilitySelectModal;
