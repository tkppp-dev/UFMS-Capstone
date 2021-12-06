import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Text, ScrollView } from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import { Context } from '../../src/context';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import RentalInfo from '../../src/components/RentalInfo'
import { endPoint } from '../../src/endPoint';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const RentalManagement = function ({ navigation }) {
  const { state } = useContext(Context);
  const [rentalData, setRentalData] = useState([]);
  const [refresh, setRefresh] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: '대관 관리',
    });
  });

  const getRentalData = async function () {
    try {
      const res = await axios.get(endPoint + `rental/member/${state.user.id}`);

      if (res.status === 200) {
        setRentalData(res.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  useEffect(() => {
    getRentalData()
  }, [])

  useEffect(() => {
    if(refresh === true){
      getRentalData()
      setRefresh(false)
    }
  }, [refresh])

  return (
    <Provider>
      {rentalData.length === 0 ? (
        <Container style={{ justifyContent: 'center' }}>
          <Text>현재 대관한 시설이 없습니다</Text>
        </Container>
      ) : (
        <ScrollView
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        >
          {refresh === true ? (
            <LoadingSpinner />
          ) : (
            <Container>
              {rentalData.map((item, idx) => {
                return (
                  <RentalInfo
                    key={idx}
                    rentalData={item}
                    setRefresh={setRefresh}
                  />
                );
              })}
            </Container>
          )}
        </ScrollView>
      )}
    </Provider>
  );
};

export default RentalManagement;
