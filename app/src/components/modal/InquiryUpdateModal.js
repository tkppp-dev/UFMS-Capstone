import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import { InquiryContext } from '../../context/inquiry';

const InquiryUpdateModal = function ({ updateInquiry }) {
  const { inquiryState, dispatch } = useContext(InquiryContext);

  const _onDismiss = function () {
    dispatch({ type: 'UPDATE_MODAL_DISMISS' });
  };

  return (
    <Modal
      visible={inquiryState.updateModalVisible}
      onDismiss={_onDismiss}
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
          변경 사항 작성
        </Text>
        <CustomInput
          label="문의제목"
          value={inquiryState.title}
          onChangeText={(value) =>
            dispatch({ type: 'SET_TITLE', title: value })
          }
        />
        <CustomInput
          label="문의내용"
          value={inquiryState.content}
          multiline={true}
          type="textarea"
          onChangeText={(value) =>
            dispatch({ type: 'SET_CONTENT', content: value })
          }
        />
        <View style={{ marginTop: 10 }} />
        <CustomButton label="문의 수정 완료" onPress={updateInquiry} />
      </View>
    </Modal>
  );
};

export default InquiryUpdateModal;
