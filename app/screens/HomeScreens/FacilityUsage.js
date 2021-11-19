import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import localeConfig from '../../src/CalendarLocaleConfig';
import DayUsage from '../../src/components/DayUsage';
import LoadingSpinner from '../../src/components/LoadingSpinner'

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
    items[getDateStr(date)] = [{ name: '123' }];
    date.setDate(date.getDate() + 1);
  }
  return items;
};

const FacilityUsage = function ({ navigation, route }) {
  const { min, now, max } = getCalendarRange();
  const [selectDate, setSelectDate] = useState(new Date());
  const [items, setItems] = useState(getItems(min, max));
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: `${route.params.buildingName} ${route.params.facilityName} 사용 현황`,
    });
  });

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  const _onDayPress = function (day) {
    setSelectDate(new Date(day.dateString));
  };

  const _onDayChange = function (day) {
    setSelectDate(new Date(day.dateString));
  };

  const _renderItem = function (item) {
    return <DayUsage />;
  };

  const _rowHasChanaged = function (r1, r2) {
    return r1.name !== r2.name;
  };

  return (
    <Container>
      <CalendarHeader>
        {`${selectDate.getFullYear()} ${selectDate.getMonth() + 1}월`}
      </CalendarHeader>
      {!isReady ? (
        <LoadingSpinner />
      ) : (
        <Agenda
          items={items}
          selected={now}
          minDate={min}
          maxDate={max}
          pastScrollRange={2}
          futureScrollRange={6}
          showClosingKnob={true}
          onDayPress={_onDayPress}
          onDayChange={_onDayChange}
          renderItem={_renderItem}
          rowHasChanged={_rowHasChanaged}
          theme={{
            agendaKnobColor: 'gray',
          }}
          style={{}}
        />
      )}
    </Container>
  );
};

export default FacilityUsage;
