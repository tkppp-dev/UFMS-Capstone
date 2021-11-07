import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import MyStackNavigator from './MyStackNavigator';
import SignStackNavigator from './SignStackNavigator';
import ReservationTabNavigator from './ReservationTabNavigator';
import { Context } from '../src/context/index';

const Tab = createBottomTabNavigator();

const TabNavigation = function () {
  const { state } = useContext(Context);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      {state.user.isLogin ? (
        <>
          <Tab.Screen name="Reservation" component={ReservationTabNavigator} />
          <Tab.Screen name="MY" component={MyStackNavigator} />
        </>
      ) : (
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Sign"
          component={SignStackNavigator}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigation;
