import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { View, ScrollView, Text, Alert } from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import { FAB, Icon } from 'react-native-elements';
import LabInfo from '../../src/components/LabInfo';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { Context } from '../../src/context';
import LabRegisterModal from '../../src/components/modal/LabRegisterModal';

const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const LabManagement = function ({ navigation }) {
  const { state } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [labData, setLabData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getLabData = async function () {
    try {
      const res = await axios.post(endPoint + `schedule/lab/professor`, {
        professorName: state.user.username,
      });
      
      if (res.status === 200) {
        await setLabData(res.data);
        setRefresh(false);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: '연구실 / 사무실 관리',
    });
  });

  useEffect(() => {
    getLabData();
  }, []);

  useEffect(() => {
    if (refresh === true) {
      getLabData();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <Provider>
      {labData.length === 0 ? (
        <Container style={{ justifyContent: 'center' }}>
          <Text>등록한 연구실 / 사무실이 없습니다</Text>
          <Text>왼쪽 하단 버튼을 눌러 연구실 / 사무실을 추가하세요</Text>
        </Container>
      ) : (
        <ScrollView
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        >
          {refresh === true ? (
            <LoadingSpinner />
          ) : (
            <Container>
              {labData.map((item, idx) => {
                return (
                  <LabInfo key={idx} labData={item} setRefresh={setRefresh} />
                );
              })}
            </Container>
          )}
        </ScrollView>
      )}
      <Portal>
        <LabRegisterModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          setRefresh={setRefresh}
        />
      </Portal>
      <FAB
        placement="right"
        icon={<Icon name="plus" type="antdesign" color="white" />}
        buttonStyle={{ backgroundColor: '#00AAFF' }}
        containterStyle={{ margin: 15 }}
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </Provider>
  );
};

export default LabManagement;
