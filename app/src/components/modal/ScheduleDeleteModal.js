import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Modal } from 'react-native-paper';
import { ScheduleContext } from '../../context/schedule';
import CustomButton from '../CustomButton';


const ScheduleDeleteModal = function () {
  const { state, dispatch } = useContext(ScheduleContext);
  return (
    <Modal
      visible={state.deleteModalVisible}
      onDismiss={() => dispatch({ type: 'DELETE_MODAL_DISMISS' })}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '80%' }}>
        <View style={{marginTop: 10}}>
          <Text>선택한 스케줄을 삭제하시겠습니까?</Text>
        </View>
        <View style={{ width: '20%', alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton
            label="삭제"
            color="red"
            onPress={() => dispatch({ type: 'DELETE_MODAL_DISMISS' })}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleDeleteModal;
