import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { View, ScrollView, Text, Alert } from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import { FAB, Icon } from 'react-native-elements';
import SubjectInfo from '../../src/components/SubjectInfo';
import SubjectRegisterModal from '../../src/components/modal/SubjectRegisterModal';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { Context } from '../../src/context';

const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const ScheduleRegister = function ({ navigation }) {
  const { state } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [registeredSubject, setRegisteredSubject] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getRegisteredSubject = async function () {
    try {
      const res = await axios.get(
        endPoint + `schedule/subject/${state.user.id}`
      );
      console.log(res)
      if (res.status === 200) {
        await setRegisteredSubject(res.data);
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
      title: '스케줄 등록 관리',
    });
  });

  useEffect(() => {
    getRegisteredSubject();
  }, []);

  useEffect(() => {
    if (refresh === true) {
      getRegisteredSubject();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <Provider>
      {registeredSubject.length === 0 ? (
        <Container style={{ justifyContent: 'center' }}>
          <Text>스케줄에 등록한 과목이 없습니다</Text>
          <Text>왼쪽 하단 버튼을 눌러 과목을 추가하세요</Text>
        </Container>
      ) : (
        <ScrollView
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        >
          {refresh === true ? (
            <LoadingSpinner />
          ) : (
            <Container>
              {registeredSubject.map((item, idx) => {
                return (
                  <SubjectInfo
                    key={idx}
                    subjectData={item}
                    setRefresh={setRefresh}
                  />
                );
              })}
            </Container>
          )}
        </ScrollView>
      )}
      <Portal>
        <SubjectRegisterModal
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

export default ScheduleRegister;
