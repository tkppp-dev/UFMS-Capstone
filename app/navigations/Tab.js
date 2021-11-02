import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import MyStackNavigator from './MyStackNavigator';
import SignStackNavigator from './SignStackNavigator';
import ReservationTabNavigator from './ReservationTabNavigator';

const Tab = createBottomTabNavigator();

const TabNavigation = function () {
  const isLogin = true;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      {isLogin ? (
        <>
          <Tab.Screen name="Reservation" component={ReservationTabNavigator} />
          <Tab.Screen name="MY" component={MyStackNavigator} />
        </>
      ) : (
        <Tab.Screen
          options={{ headerShown: false }}
          name="Sign"
          component={SignStackNavigator}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigation;
