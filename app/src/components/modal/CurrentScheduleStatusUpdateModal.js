import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { RadioButton, Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';

const CurrentSchduleStatusUpdateModal = function ({
  visible,
  onDismiss,
  onPressUpdate,
}) {
  const [scheduleStatus, setScheduleStatus] = useState(null);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '90%' }}>
        <RadioButton.Group
          onValueChange={(value) => {
            setScheduleStatus(value);
          }}
          value={scheduleStatus}
        >
          <View>
            <RadioButton.Item label="강의중" value="강의중" />
          </View>
          <View>
            <RadioButton.Item label="강의종료" value="강의종료" />
          </View>
          <View>
            <RadioButton.Item label="휴강" value="휴강" />
          </View>
        </RadioButton.Group>
        <View style={{ width: '30%', alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton
            label="스케줄 상태 변경"
            onPress={() => {
              if(scheduleStatus === null){
                Alert.alert('변경할 상태를 선택해주세요')
                return ''
              }
              else{
                onPressUpdate(scheduleStatus)
              }
              onDismiss();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CurrentSchduleStatusUpdateModal;
