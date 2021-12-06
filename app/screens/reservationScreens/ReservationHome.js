import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Context } from '../../src/context/index';
import { InquiryProvider } from '../../src/context/inquiry';
import ClassRentHome from './ClassRentHome';
import RentHome from './RentHome';
import RentInquiry from './ReservationInquiry';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

const TabBarLabel = styled.Text`
  margin: 8px 0;
`;

const routeSetting = function (previlege) {
  const routes = [];

  if (previlege !== 'GUEST') {
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
  const [previlege, setPrevilege] = useState('');
  const [routes, setRoutes] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 예약',
      headerTitleAlign: 'center',
    });
  });

  useEffect(() => {
    const getPrevilege = async function () {
      try {
        const res = await axios.get(
          endPoint + `api/auth/user/${state.user.id}`
        );
        setPrevilege(res.data.data.privileges);
      } catch (err) {
        console.error(err);
        Alert.alert('정보 로드에 실패했습니다');
      }
    };
    getPrevilege();
    setRoutes(routeSetting(previlege))
  }, []);

  useEffect(() =>{
    setRoutes(routeSetting(previlege))
  }, [previlege])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'classRent':
        return <ClassRentHome navigation={navigation} />;
      case 'rent':
        return <RentHome navigation={navigation} />;
      case 'inquiry':
        return (
          <InquiryProvider>
            <RentInquiry navigation={navigation} />
          </InquiryProvider>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#007AFF' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route }) => {
        return <TabBarLabel>{route.title}</TabBarLabel>;
      }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(idx) => setIndex(idx)}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default ReservationHome;
