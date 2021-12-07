import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import { InquiryContext } from '../../context/inquiry';

const InquiryDeleteModal = function ({ deleteInquiry }) {
  const { inquiryState, dispatch } = useContext(InquiryContext);

  const _onDismiss = function () {
    dispatch({ type: 'DELETE_MODAL_DISMISS' });
  };

  return (
    <Modal
      visible={inquiryState.deleteModalVisible}
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
          선택한 문의를 삭제하겠습니까?
        </Text>
        <View style={{ marginTop: 10 }} />
        <CustomButton label="문의 삭제 완료" onPress={deleteInquiry} />
      </View>
    </Modal>
  );
};

export default InquiryDeleteModal;
