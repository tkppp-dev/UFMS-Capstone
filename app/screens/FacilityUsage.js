import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import localeConfig from '../src/CalendarLocaleConfig';

LocaleConfig.locales['kr'] = localeConfig;
LocaleConfig.defaultLocale = 'kr';

const Container = styled.View`
  flex: 1;
`;

const CalendarHeader = styled.Text`
  padding: 10px 0 10px 0;
  background-color: white;
  text-align: center;
  font-size: 20px;
  color: #596571;
`;

const getDateStr = function (dt) {
  const year = dt.getFullYear();
  const month =
    String(dt.getMonth() + 1).length === 1
      ? '0' + String(dt.getMonth() + 1)
      : dt.getMonth() + 1;
  const day =
    String(dt.getDate()).length === 1
      ? '0' + String(dt.getDate())
      : dt.getDate();
  return `${year}-${month}-${day}`;
};

const getCalendarRange = function () {
  // 밀리초 1000, 초 60, 분 60, 시간 24
  const dayOffset = 1000 * 60 * 60 * 24;
  const dt = new Date();
  const minDate = new Date(Date.now() - 30 * dayOffset);
  const maxDate = new Date(Date.now() + 180 * dayOffset);

  return {
    min: getDateStr(minDate),
    now: getDateStr(dt),
    max: getDateStr(maxDate),
  };
};

const getItems = function (min, max) {
  const date = new Date(min);
  const endDate = new Date(max);
  const items = {};

  while (date <= endDate) {
    items[getDateStr(date)] = [];
    date.setDate(date.getDate() + 1);
  }
  return items;
};

const FacilityUsage = function ({navigation, route}) {
  const { min, now, max } = getCalendarRange();
  const items = getItems(min, max);
  const [selectDate, setSelectDate] = useState(new Date());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: `${route.params.facilityName} 사용 현황`
    })
  })

  console.log(navigation)
  return (
    <Container>
       <CalendarHeader>
        {`${selectDate.getFullYear()} ${selectDate.getMonth() + 1}월`}
      </CalendarHeader>
      <Agenda
        items={items}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {
          console.log('trigger items loading');
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          setSelectDate(new Date(day.dateString));
        }}
        selected={now}
        minDate={min}
        maxDate={max}
        pastScrollRange={2}
        futureScrollRange={6}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        showClosingKnob={true}
        // Agenda theme
        theme={{
          agendaKnobColor: 'gray',
        }}
        // Agenda container style
        style={{}}
      />
    </Container>
  );
};

export default FacilityUsage;
