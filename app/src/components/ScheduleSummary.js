import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { View, Text, Alert } from 'react-native';
import InformationItem from './InformationItem';
import axios from 'axios';
import { endPoint } from '../endPoint';

const Container = styled.View`
  width: 100%;
  margin-bottom: 12px;
  padding: 20px;
  background-color: white;
`;

const ContentTitle = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: gray;
  margin-bottom: 8px;
  padding: 0 4px 8px 4px;
`;

const ContentBody = styled.View`
  padding: 0 4px 0 4px;
  margin: 8px 0 8px 0;
`;

const StyledText = styled.Text`
  font-size: ${({ fontSize }) =>
    fontSize !== undefined ? fontSize + 'px' : '16px'};
  font-weight: ${({ fontWeight }) =>
    fontWeight !== undefined ? fontWeight : 'normal'};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom !== undefined ? marginBottom + 'px' : '6px'};
`;

const ScheduleSummary = function ({ userId }) {
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);
  const [currentScheduleState, setCurrentScheduleState] = useState('');
  const [nextScheduleState, setNextScheduleState] = useState('');

  const getCurrentSchedule = async function () {
    try {
      const res = await axios.get(endPoint + `schedule/now/${userId}`);
      if (res.data === '') {
        setCurrentSchedule(null);
      } else {
        await setCurrentSchedule(res.data);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로딩에 실패했습니다');
    }
  };

  const getNextSchedule = async function () {
    try {
      const res = await axios.get(endPoint + `schedule/next/${userId}`);
      if (res.data === '') {
        setNextSchedule(null);
      } else {
        await setNextSchedule(res.data);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로딩에 실패했습니다');
    }
  };

  const getScheduleState = function (state) {
    switch (state) {
      case 'BEFORE':
      case 'WAIT':
        return '대기 일정';
      case 'ING':
        return '현재 일정';
      case 'END':
      case 'COMPLETE':
        return '지난 일정';
      case 'CANCEL':
        return '취소 일정';
      default:
        return '에러';
    }
  };

  useEffect(() => {
    getCurrentSchedule();
    getNextSchedule();

    if (currentSchedule !== null) {
      setCurrentScheduleState(
        getScheduleState(currentSchedule.reservationStatus)
      );
    }

    if (nextSchedule !== null) {
      setNextScheduleState(getScheduleState(nextSchedule.reservationStatus));
    }
  }, []);

  useEffect(() => {
    if (currentSchedule !== null) {
      setCurrentScheduleState(
        getScheduleState(currentSchedule.reservationStatus)
      );
    }
  }, [currentSchedule]);

  useEffect(() => {
    if (nextSchedule !== null) {
      setNextScheduleState(getScheduleState(nextSchedule.reservationStatus));
    }
  }, [nextSchedule]);

  return (
    <Container>
      <ContentTitle>
        <StyledText fontSize="20" fontWeight="bold">
          현재 스케줄
        </StyledText>
      </ContentTitle>
      <ContentBody>
        {currentSchedule === null ? (
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <Text style={{ fontSize: 15 }}>현재 스케줄이 없습니다</Text>
          </View>
        ) : (
          <View style={{ marginBottom: 16 }}>
            <InformationItem
              title="스케줄 이름"
              body={currentSchedule.reservationName}
            />
            <InformationItem title="위치" body={currentSchedule.facility} />
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <InformationItem title="시간" body="12:00~13:30" row={true} />
              <InformationItem
                title="상태"
                body={currentScheduleState}
                row={true}
              />
            </View>
          </View>
        )}
      </ContentBody>
      <ContentTitle>
        <StyledText fontSize="20" fontWeight="bold">
          다음 스케줄
        </StyledText>
      </ContentTitle>
      <ContentBody>
        {nextSchedule === null ? (
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <Text style={{ fontSize: 15 }}>다음 스케줄이 없습니다</Text>
          </View>
        ) : (
          <View>
            <InformationItem
              title="스케줄 이름"
              body={nextSchedule.reservationName}
            />
            <InformationItem title="위치" body={nextSchedule.facility} />
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="시간"
                body={nextSchedule.time}
                row={true}
              />
              <InformationItem
                title="상태"
                body={nextScheduleState}
                row={true}
              />
            </View>
          </View>
        )}
      </ContentBody>
    </Container>
  );
};

export default ScheduleSummary;
