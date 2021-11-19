import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import ScheduleDetail from './ScheduleDetail';

const DateContainer = styled.View`
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #dddfe2;
  padding: 10px 0;
`;
const DateText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const getCurrentWeekDate = function (dayOfWeek) {
  const dt = new Date();
  const currentDayOfWeek = dt.getDay();

  if (currentDayOfWeek === dayOfWeek) {
    return dt;
  } else {
    return new Date(dt.setDate(dt.getDate() + (dayOfWeek - currentDayOfWeek)));
  }
};

const DaySchedule = function ({ dayOfWeek }) {
  const [date] = useState(getCurrentWeekDate(dayOfWeek % 7));
  const schedules = [
    {
      id: 1,
      name: '스케줄 이름',
      startTime: '12:00',
      endTime: '13:30',
      location: '율곡관 301호',
      status: '대기중',
    },
    {
      id: 2,
      name: '스케줄 이름',
      startTime: '13:30',
      endTime: '15:00',
      location: '율곡관 301호',
      status: '대기중',
    },
    {
      id: 3,
      name: '스케줄 이름',
      startTime: '15:00',
      endTime: '16:30',
      location: '율곡관 301호',
      status: '대기중',
    },
  ];
  return (
    <View>
      <DateContainer>
        <DateText>
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
        </DateText>
      </DateContainer>
      <ScrollView>
        {schedules.map((schedule) => {
          return <ScheduleDetail key={schedule.id} schedule={schedule} />;
        })}
      </ScrollView>
    </View>
  );
};

export default DaySchedule;
