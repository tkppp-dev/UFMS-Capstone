import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Context } from '../../src/context/index';
import Header from '../../src/components/Header';
import ClassRoom from './ClassRoom';
import Rental from './Rental';
import Lab from './Lab';

const routeNames = {
  classRoom: '강의실',
  rental: '대관 시설',
  lab: '연구실/사무실',
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const TabBarLabel = styled.Text`
  margin: 6px 0;
`;

const routeSetting = function (user) {
  const routes = [];

  routes.push({ key: 'classRoom', title: '강의실 사용현황' });
  routes.push({ key: 'rental', title: '대관 시설 사용현황' });
  routes.push({ key: 'lab', title: '연구실/사무실' });

  return routes;
};

const InquireHome = function ({ navigation }) {
  const layout = Dimensions.get('window');
  const { state } = useContext(Context);
  const [index, setIndex] = useState(0);
  const [routes] = useState(routeSetting(state.user));

  console.log(state)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 예약',
      headerTitleAlign: 'center',
    });
  });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'classRoom':
        return <ClassRoom navigation={navigation} />;
      case 'rental':
        return <Rental navigation={navigation} />;
      case 'lab':
        return <Lab navigation={navigation} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#007AFF' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => <TabBarLabel>{route.title}</TabBarLabel>}
    />
  );

  return (
    <>
      <Header />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(idx) => setIndex(idx)}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};

export default InquireHome;
