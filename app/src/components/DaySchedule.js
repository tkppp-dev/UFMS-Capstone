import React, { useEffect, useState } from 'react';
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

const DaySchedule = function ({
  referenceDate,
  setReferenceDate,
  dayOfWeek,
  scheduleData = [],
}) {
  const [date] = useState(getCurrentWeekDate(referenceDate, dayOfWeek % 7));

  const _setReferenceDate = function (offset) {
    const dt = new Date(referenceDate);
    dt.setDate(referenceDate.getDate() + offset * 7);
    setReferenceDate(dt);
  };

  return (
    <View style={{ flex: 1 }}>
      <DateContainer style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6}}
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
          style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 }}
          onPress={() => _setReferenceDate(1)}
        >
          <Text>다음주</Text>
          <Icon type="antdesign" name="right" size={18} />
        </TouchableOpacity>
      </DateContainer>
      {scheduleData.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>스케줄이 없습니다</Text>
        </View>
      ) : (
        <ScrollView>
          {scheduleData.map((schedule) => (
            <ScheduleDetail key={schedule.reservationId} schedule={schedule}/>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default React.memo(DaySchedule);
