import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { View, TextInput, Text, Alert } from 'react-native';
import { Modal } from 'react-native-paper';
import { ScheduleContext } from '../../context/schedule';
import axios from 'axios';
import { endPoint } from '../../endPoint';

const CustomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: red;
  width: 50px;
  height: 33px;
`;

const Input = function ({ label, value, editable = true, multiline = false }) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
    >
      <Text style={{ width: '20%' }}>{label}</Text>
      <TextInput
        style={{
          flex: 1,
          borderWidth: editable ? 1 : 0,
          borderColor: 'gray',
          borderRadius: 4,
          padding: 8,
        }}
        editable={editable}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={value}
        multiline={multiline}
      />
    </View>
  );
};

const ScheduleUpdateModal = function () {
  const { state, dispatch } = useContext(ScheduleContext);

  const onPressUpdate = async function () {
    try {
      const res = await axios.delete(
        endPoint + `reservation/${state.schedule.reservationId}`
      );

      if (res.status === 200) {
        dispatch({ type: 'UPDATE_MODAL_DISMISS' });
        setRefresh(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('스케줄 삭제에 실패했습니다');
    }
  };

  return (
    <Modal
      visible={state.updateModalVisible}
      onDismiss={() => dispatch({ type: 'UPDATE_MODAL_DISMISS' })}
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
        <View>
          <Input label="시간" editable={false} value={state.schedule.time} />
          <Input
            label="위치"
            editable={false}
            value={state.schedule.facility}
          />
          <Input label="이름" value={state.schedule.reservationName} />
          <Input label="공지사항" value={state.schedule.notice} />
        </View>
        <View style={{ alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton onPress={onPressUpdate}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>삭제</Text>
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleUpdateModal;
