import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, Dimensions, Alert } from 'react-native';
import DaySchedule from '../../src/components/DaySchedule';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ScheduleProvider } from '../../src/context/schedule';
import ScheduleUpdateModal from '../../src/components/modal/ScheduleUpdateModal';
import ScheduleDeleteModal from '../../src/components/modal/ScheduleDeleteModal';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { Context } from '../../src/context';
import DateFormat from '../../src/DateFormat';

const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wen', 'Thi', 'Fri', 'Sat'];
const korDayOfWeek = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wen: '수',
  Thi: '목',
  Fri: '금',
  Sat: '토',
};

const getWeekStartEndDate = function (referenceDate) {
  const dt = new Date(referenceDate);
  const currentDayOfWeek = dt.getDay();

  const start = new Date(dt.setDate(dt.getDate() + (0 - currentDayOfWeek)));
  const end = new Date(dt.setDate(dt.getDate() + 6));

  const startDate = new DateFormat().setDate(start).toString();
  const endDate = new DateFormat().setDate(end).toString();

  return { startDate, endDate };
};

const WeekSchdule = function ({ navigation }) {
  const layout = Dimensions.get('window');
  const { state } = useContext(Context);
  const [date, setDate] = useState(new Date());
  const { startDate, endDate } = getWeekStartEndDate(date);
  const [index, setIndex] = useState(date.getDay());
  const [scheduleData, setScheduleData] = useState([]);
  const [routes] = useState(
    dayOfWeek.map((day) => {
      return { key: day, title: day };
    })
  );

  const getScheduleData = async function () {
    try {
      const res = await axios.post(endPoint + 'schedule', {
        memberId: state.user.id,
        startDate,
        endDate,
      });
      if (res.status === 200) {
        setScheduleData(res.data);
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
      title: '스케줄',
    });
  });

  useEffect(() => {
    getScheduleData();
  }, []);

  useEffect(() => {
    getScheduleData()
  },[date])

  const renderScene = function (date, setDate) {
    const components = {};
    for (let i = 0; i < 7; i++) {
      components[dayOfWeek[i]] = () => (
        <DaySchedule
          referenceDate={date}
          setReferenceDate={setDate}
          dayOfWeek={i}
          scheduleData={scheduleData[i]}
        />
      );
    }

    return SceneMap(components);
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#007AFF' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => (
        <Text
          style={{
            color: route.title === 'Sun' ? 'red' : 'black',
            marginVertical: 8,
          }}
        >
          {korDayOfWeek[route.title]}
        </Text>
      )}
    />
  );

  return (
    <ScheduleProvider>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene(date, setDate)}
        onIndexChange={(idx) => setIndex(idx)}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
      />
      <ScheduleUpdateModal />
      <ScheduleDeleteModal />
    </ScheduleProvider>
  );
};

export default WeekSchdule;
