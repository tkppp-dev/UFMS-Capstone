import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert } from 'react-native';
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

const ScheduleDeleteModal = function ({ setRefresh }) {
  const { state, dispatch } = useContext(ScheduleContext);

  const onPressDelete = async function () {
    try {
      const res = await axios.delete(
        endPoint + `reservation/${state.schedule.reservationId}`
      );

      if (res.status === 200) {
        dispatch({ type: 'DELETE_MODAL_DISMISS' });
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
      visible={state.deleteModalVisible}
      onDismiss={() => dispatch({ type: 'DELETE_MODAL_DISMISS' })}
      contentContainerStyle={{
        width: '90%',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      }}
    >
      <View style={{ width: '100%' }}>
        <View style={{ marginTop: 10 }}>
          <Text>선택한 스케줄을 삭제하시겠습니까?</Text>
        </View>
        <View style={{ alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton onPress={onPressDelete}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>삭제</Text>
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleDeleteModal;
