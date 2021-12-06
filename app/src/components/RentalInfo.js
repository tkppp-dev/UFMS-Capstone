import React, { useContext, useEffect, useState } from 'react';
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
  width: 70px;
  height: 33px;
`;

const DeleteButton = styled(CustomButton)`
  background-color: red;
`;

const RentalItem = function ({ title, body, type = 'row' }) {
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

const RentalInfo = function ({ rentalData, setRefresh }) {
  const { state } = useContext(Context);
  const [rentalStatus, setRentalStatus] = useState('');

  useEffect(() => {
    switch (rentalData.rentalStatus) {
      case 'WAIT':
        setRentalStatus('승인 대기');
        break;
      case 'END':
      case 'COMPLETE':
        setRentalStatus('지난 일정');
        break;
      default:
        setRentalStatus('예외');
        break;
    }
  }, []);

  const _onPressDeleteButton = async function () {
    try {
      const res = await axios.post(endPoint + 'rental/delete', {
        rentalId: rentalData.id,
      });
      if(res.status === 200){
        Alert.alert('대관 취소가 완료되었습니다')
        setRefresh(true)
      }
      else{
        throw new Error()
      }
      // 성공 여부 확인 필요
      setRefresh(true);
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 오류로 대관 취소를 완료하지 못했습니다');
    }
  };

  return (
    <>
      <Container>
        <RowContainer>
          <RentalItem title="행사명" body={rentalData.eventName} />
          <RentalItem title="대관주체" body={rentalData.groupName} />
        </RowContainer>
        <RowContainer>
          <RentalItem title="대관 목적" body={rentalData.purpose} />
          <RentalItem title="위치" body={rentalData.facility} />
        </RowContainer>
        <RowContainer>
          <RentalItem title="추가연락처" body={rentalData.additionalMobile} />
          <RentalItem title="추가이메일" body={rentalData.additionalEmail} />
        </RowContainer>
        <RowContainer>
          <RentalItem
            title="기간"
            body={`${rentalData.startDate}~${rentalData.endDate}`}
            type="col"
          />
        </RowContainer>
        <RowContainer>
          <RentalItem title="상태" body={rentalStatus} type="col" />
        </RowContainer>
        <DeleteButton onPress={_onPressDeleteButton}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>대관 취소</Text>
        </DeleteButton>
      </Container>
    </>
  );
};

export default RentalInfo;
