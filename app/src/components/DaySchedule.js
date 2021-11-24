import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';
import ScheduleDetail from './ScheduleDetail';

const DateContainer = styled.View`
  flex-direction: row;
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

const getCurrentWeekDate = function (date, dayOfWeek) {
  const dt = new Date(date);
  const currentDayOfWeek = dt.getDay();

  if (currentDayOfWeek === dayOfWeek) {
    return dt;
  } else {
    return new Date(dt.setDate(dt.getDate() + (dayOfWeek - currentDayOfWeek)));
  }
};

const DaySchedule = function ({ referenceDate, setReferenceDate, dayOfWeek }) {
  const [date] = useState(getCurrentWeekDate(referenceDate, dayOfWeek % 7));
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

  const _setReferenceDate = function (offset) {
    const dt = new Date(referenceDate);
    dt.setDate(referenceDate.getDate() + offset * 7);
    setReferenceDate(dt);
  };

  return (
    <View>
      <DateContainer style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => _setReferenceDate(-1)}
        >
          <Icon type="antdesign" name="left" size={18} />
          <Text>지난주</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <DateText>
            {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
          </DateText>
        </View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => _setReferenceDate(1)}
        >
          <Text>다음주</Text>
          <Icon type="antdesign" name="right" size={18} />
        </TouchableOpacity>
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
