import React, { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { FAB, Icon } from 'react-native-elements';
import localeConfig from '../../src/CalendarLocaleConfig';
import DayUsage from '../../src/components/DayUsage';
import { Provider, Portal } from 'react-native-paper';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import FacilitySelectModal from '../../src/components/modal/FacilitySelectModal';

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

const EmptyItemRenderData = function (items) {
  const [isEmtpy, setIsEmpty] = useState(true)

  useEffect(() => {
    if(Object.keys(items).length > 0){
      setIsEmpty(false)
    }
    else{
      setIsEmpty(true)
    }
  }, [items])

  return (
    <>  
      {isEmtpy ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>오른쪽 하단의 버튼을 눌러 시설을 선택하세요</Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>해당 날짜의 사용 예약이 없습니다</Text>
        </View>
      )}
    </>
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

const ClassRoomUsage = function ({ navigation, route }) {
  const { min, now, max } = getCalendarRange();
  const [selectDate, setSelectDate] = useState(new Date());
  const [items, setItems] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: `${route.params.buildingData.name} 사용 현황`,
    });
  });

  useEffect(() => {
    console.log(items);
  }, [items]);
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
    <Provider>
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
        <FacilitySelectModal
          visible={modalVisible}
          onDismiss={setModalVisible}
          setItems={setItems}
          setRefresh={setRefresh}
          buildingData={route.params.buildingData}
        />
        <FAB
          placement="right"
          icon={<Icon name="search1" type="antdesign" color="white" />}
          buttonStyle={{ backgroundColor: '#00AAFF' }}
          containterStyle={{ margin: 15 }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </Container>
    </Provider>
  );
};

export default ClassRoomUsage;
