import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Context } from '../../src/context/index';
import ClassRentReservation from './ClassRentReservation';
import RentReservation from './RentReservation';
import RentInquiry from './ReservationInquiry';

const TabBarLabel = styled.Text`
  margin: 8px 0;
`;

const routeSetting = function (user) {
  const routes = [];
  if (user.userType !== '외부인') {
    routes.push({ key: 'classRent', title: '강의실 예약' });
  }
  routes.push({ key: 'rent', title: '대관' });
  routes.push({ key: 'inquiry', title: '문의' });

  return routes;
};

const ReservationHome = function ({ navigation }) {
  const layout = Dimensions.get('window');
  const { state } = useContext(Context);
  const [index, setIndex] = useState(0);
  const [routes] = useState(routeSetting(state.user));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 예약',
      headerTitleAlign: 'center'
    })
  })

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#007AFF' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => <TabBarLabel>{route.title}</TabBarLabel>}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        classRent: () => <ClassRentReservation navigation={navigation} />,
        rent: () => <RentReservation navigation={navigation} />,
        inquiry: () => <RentInquiry navigation={navigation} />,
      })}
      onIndexChange={(idx) => setIndex(idx)}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default ReservationHome;