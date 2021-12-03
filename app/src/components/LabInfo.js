import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import { Context } from '../context';
import { endPoint } from '../endPoint';

const Container = styled.View`
  width: 100%;
  padding: 15px 15px 10px 15px;
  background-color: white;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #d6dde4;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-weight: bold;
`;

const CustomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: 5px;
  border-radius: 4px;
  width: 50px;
  height: 33px;
`;

const DeleteButton = styled(CustomButton)`
  background-color: red;
`;

const LabItem = function ({ title, body, type = 'row' }) {
  return (
    <RowContainer style={{ flex: 1, marginBottom: 5 }}>
      <View style={{ flex: 1 }}>
        <TitleText>{title}</TitleText>
      </View>
      <View style={{ flex: type === 'row' ? 2 : 5 }}>
        <Text>{body}</Text>
      </View>
    </RowContainer>
  );
};

const LabInfo = function ({ labData, setRefresh }) {
  const _onPressDeleteButton = async function () {
    try {
      const res = await axios.delete(
        endPoint + `schedule/lab/${labData.labId}`
      );

      // 성공 여부 확인 필요
      setRefresh(true);
    } catch (err) {
      console.error(err);
      Alert.alert(
        '예상치 못한 오류로 연구실 / 사무실 삭제를 완료하지 못했습니다'
      );
    }
  };
  return (
    <>
      <Container>
        <RowContainer>
          <LabItem title="이름" body={labData.name} />
          <LabItem title="위치" body={labData.location} />
        </RowContainer>
        <RowContainer>
          <LabItem title="상태" body={labData.state} type="col"/>
        </RowContainer>
        <RowContainer>
          <LabItem title="공지사항" body={labData.notice} type="col" />
        </RowContainer>
        <DeleteButton onPress={_onPressDeleteButton}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>삭제</Text>
        </DeleteButton>
      </Container>
    </>
  );
};

export default LabInfo;
