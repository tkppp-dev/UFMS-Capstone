import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Modal } from 'react-native-paper';
import { ScheduleContext } from '../../context/schedule';
import CustomButton from '../CustomButton';

const Input = function ({ label, value, editable = true, multiline = false }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <Text style={{ width: '20%' }}>{label}</Text>
      <TextInput
        style={{
          flex: 1,
          borderWidth: editable ? 1 : 0,
          borderColor: 'gray',
          borderRadius: 4,
          padding: 8
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
  return (
    <Modal
      visible={state.updateModalVisible}
      onDismiss={() => dispatch({ type: 'UPDATE_MODAL_DISMISS' })}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '90%' }}>
        <View>
          <Input
            label="시간"
            editable={false}
            value={`${state.schedule.startTime}~${state.schedule.endTime}`}
          />
          <Input label="이름" value={state.schedule.name} />
          <Input label="위치" value={state.schedule.location} />
          <Input label="공지사항" value={state.schedule.notice} />
        </View>
        <View style={{ width: '30%', alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton
            label="변경 사항 저장"
            onPress={() => dispatch({ type: 'UPDATE_MODAL_DISMISS' })}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleUpdateModal;
