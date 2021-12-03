import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card, Title } from 'react-native-paper';
import localeConfig from '../../src/CalendarLocaleConfig';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import DateFormat from '../../src/DateFormat';

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

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;

const RowTitle = styled.Text`
  width: 60px;
  font-weight: bold;
`;
const RowBody = styled.Text`
  flex: 7;
`;

const DayUsage = function ({ item }) {
  return (
    <Container>
      <Card style={{ marginVertical: 5 }}>
        <Card.Content>
          <Title style={{ marginBottom: 8 }}>{item.hirer}</Title>
          <RowContainer>
            <RowTitle>대관주체</RowTitle>
            <RowBody>{item.groupName}</RowBody>
          </RowContainer>
          <RowContainer>
            <RowTitle>대관목적</RowTitle>
            <RowBody>{item.purpose}</RowBody>
          </RowContainer>
          <RowContainer>
            <RowTitle>상태</RowTitle>
            <RowBody>{item.rentalStatus}</RowBody>
          </RowContainer>
        </Card.Content>
      </Card>
    </Container>
  );
};

const EmptyItemRenderData = function (items) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>해당 날짜의 대관 예약이 없습니다</Text>
    </View>
  );
};

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

const RentalUsage = function ({ navigation, route }) {
  const { min, now, max } = getCalendarRange();
  const [selectDate, setSelectDate] = useState(new Date());
  const [items, setItems] = useState({});
  const facility = route.params.facilityName;

  const getDatePeriod = function (item) {
    const dateList = [];
    if (item.startDate === item.endDate) {
      dateList.push(item.startDate);
    } else {
      const dt = new Date(item.startDate);
      const end = new Date(item.endDate);

      while (dt <= end) {
        let temp = new DateFormat().setDate(dt);
        dateList.push(temp.toString());
        dt.setDate(dt.getDate() + 1);
      }
    }
    return dateList;
  };

  const getRentalUsage = async function () {
    try {
      const res = await axios.get(endPoint + `rental/check/${facility}`);
      console.log(res.data)
      if (res.status === 200) {
        const temp = {};
        res.data.forEach((item) => {
          const period = getDatePeriod(item);
          period.forEach((date) => {
            temp[date] = [
              {
                ...item,
              },
            ];
          });
        });

        setItems(temp);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: `${facility} 사용 현황`,
    });
  });

  useEffect(() => {
    getRentalUsage();
  }, []);

  const _onDayPress = function (day) {
    setSelectDate(new Date(day.dateString));
  };

  const _onDayChange = function (day) {
    setSelectDate(new Date(day.dateString));
  };

  const _renderItem = function (item) {
    return <DayUsage item={item} />;
  };

  const _rowHasChanaged = function (r1, r2) {
    return r1.name !== r2.name;
  };

  return (
    <Container>
      <CalendarHeader>
        {`${selectDate.getFullYear()} ${selectDate.getMonth() + 1}월`}
      </CalendarHeader>
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
        renderEmptyDate={() => {
          return (
            <View>
              <Text>asd</Text>
            </View>
          );
        }}
        renderEmptyData={() => {
          return <EmptyItemRenderData items={items} />;
        }}
        rowHasChanged={_rowHasChanaged}
        theme={{
          agendaKnobColor: 'gray',
        }}
        style={{}}
      />
    </Container>
  );
};

export default RentalUsage;
