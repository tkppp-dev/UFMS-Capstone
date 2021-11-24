import React, { useEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';

const OfficeNoticeUpdateModal = function ({
  visible,
  onDismiss,
  value,
  onPressUpdate,
}) {
  const [notice, setNotice] = useState(value);

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
        borderRadius: 4,
      }}
    >
      <View style={{ width: '90%' }}>
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}
          >
            공지사항 변경
          </Text>
        </View>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              marginHorizontal: 20,
              padding: 10,
            }}
            value={notice}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            onChangeText={(value) => setNotice(value)}
          />
        </View>
        <View style={{ width: '30%', alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton
            label="공지사항 변경"
            onPress={() => {
              if (notice.length === 0) {
                onPressUpdate('없음');
              } else {
                onPressUpdate(notice);
              }
              onDismiss();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OfficeNoticeUpdateModal;
