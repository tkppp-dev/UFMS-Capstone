import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { RadioButton, Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';

const OfficeStatusUpdateModal = function ({
  visible,
  onDismiss,
  onPressUpdate,
}) {
  const [officeStatus, setOfficeStatus] = useState();
  const [editable, setEditable] = useState(false);
  const [etcInput, setEtcInput] = useState('');

  useEffect(() => {
    if (officeStatus === '기타') {
      setEditable(true);
    } else {
      setEtcInput('');
      setEditable(false);
    }
  }, [officeStatus]);

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
        <RadioButton.Group
          onValueChange={(value) => {
            setOfficeStatus(value);
          }}
          value={officeStatus}
        >
          <View>
            <RadioButton.Item label="재실" value="재실" />
          </View>
          <View>
            <RadioButton.Item label="부재" value="부재" />
          </View>
          <View>
            <RadioButton.Item label="회의중" value="회의중" />
          </View>
          <View>
            <RadioButton.Item label="기타" value="기타" />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                marginHorizontal: 18,
                padding: 10,
              }}
              value={etcInput}
              autoCapitalize="none"
              autoCorrect={false}
              editable={editable}
              onChangeText={(value) => setEtcInput(value)}
            />
          </View>
        </RadioButton.Group>
        <View style={{ width: '30%', alignSelf: 'flex-end', marginTop: 20 }}>
          <CustomButton
            label="사용 상태 변경"
            onPress={() => {
              if (officeStatus === '기타') {
                if (etcInput.length < 1) {
                  Alert.alert('기타 사유를 적어주세요');
                  return '';
                }
                onPressUpdate(etcInput);
              } else {
                onPressUpdate(officeStatus);
              }
              onDismiss();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OfficeStatusUpdateModal;
