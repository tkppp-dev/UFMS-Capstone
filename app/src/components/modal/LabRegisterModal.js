import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { Context } from '../../context';
import CustomButton from '../CustomButton';
import axios from 'axios';
import { endPoint } from '../../endPoint';

const Input = styled.TextInput.attrs((props) => {
  return {
    placeholder: props.placeholder,
    placeholderTextColor: 'gray',
    autoCapitalize: 'none',
    autoCorrect: false,
    returnKeyType: 'done',
  };
})`
  height: 38px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px;
  border-color: #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const LabRegisterModal = function ({ visible, onDismiss, setRefresh }) {
  const { state } = useContext(Context);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const registerLab = async function () {
    try {
      if (name.length !== 0 && location.length !== 0) {
        const res = await axios.post(endPoint + 'schedule/lab', {
          memberId: state.user.id,
          name,
          location,
        });

        if (res.status === 200) {
          onDismiss();
          setRefresh(true);
        } else {
          throw new Error();
        }
      } else {
        Alert.alert('모두 입력해주세요');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('연구실 / 사무실 추가에 실패했습니다');
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
            marginBottom: 25,
          }}
        >
          연구실 / 사무실 추가
        </Text>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="연구실 / 사무실 이름"
        />
        <Input
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="연구실 / 사무실 위치"
        />
        <View style={{ marginTop: 20 }} />
        <CustomButton label="연구실 / 사무실 추가" onPress={registerLab} />
      </View>
    </Modal>
  );
};

export default LabRegisterModal;
