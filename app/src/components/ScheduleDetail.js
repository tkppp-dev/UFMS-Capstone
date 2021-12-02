import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../context';
import { ScheduleContext } from '../context/schedule';
import { endPoint } from '../endPoint';
import InformationItem from './InformationItem';
import axios from 'axios';

const Container = styled.View`
  background-color: white;
  padding: 10px 30px;
  margin-bottom: 15px;
`;

const CustomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 50px;
  height: 33px;
`;

const UpdateButton = styled(CustomButton)`
  background-color: #007aff;
  margin-end: 10px;
`;

const DeleteButton = styled(CustomButton)`
  background-color: red;
`;

const ScheduleDetail = function ({ schedule }) {
  const { state } = useContext(Context);
  const { dispatch } = useContext(ScheduleContext);
  const [scheduleState, setScheduleState] = useState('');

  useEffect(() => {
    switch (schedule.reservationStatus) {
      case 'BEFORE':
      case 'WAIT':
        setScheduleState('대기 일정');
        break;
      case 'ING':
        setScheduleState('현재 일정');
        break;
      case 'END':
      case 'COMPLETE':
        setScheduleState('지난 일정');
        break;
      case 'CANCEL':
        setScheduleState('취소 일정');
        break;
      default:
        setScheduleState('');
        break;
    }
  }, []);

  const onPressUpdate = function () {
    dispatch({ type: 'SELECT_SCHEDULE', schedule });
    dispatch({ type: 'UPDATE_MODAL_VISIBLE' });
  };

  const onPressDelete = async function () {
    dispatch({ type: 'SELECT_SCHEDULE', schedule });
    dispatch({ type: 'DELETE_MODAL_VISIBLE' });
  };

  return (
    <Container>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <InformationItem title="시간" body={schedule.time} row={true} />
        <InformationItem title="상태" body={scheduleState} row={true} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <InformationItem
          title="이름"
          body={schedule.reservationName}
          row={true}
        />
        <InformationItem title="위치" body={schedule.facility} row={true} />
      </View>
      <InformationItem
        title="공지사항"
        body={schedule.notice !== undefined ? schedule.notice : '없음'}
      />
      {state.user.id === schedule.memberId && scheduleState !== '지난 일정' & scheduleState !== '취소 일정' ? (
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <UpdateButton onPress={onPressUpdate}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>변경</Text>
          </UpdateButton>
          <DeleteButton onPress={onPressDelete}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>삭제</Text>
          </DeleteButton>
        </View>
      ) : null}
    </Container>
  );
};

export default ScheduleDetail;
