import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStackNavigator from './HomeStackNavigator';
import MyStackNavigator from './MyStackNavigator';
import SignIn from '../screens/SignIn';

const Tab = createBottomTabNavigator();

const TabNavigation = function () {
  const isLogin = false;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      {isLogin ? (
        <>
          <Tab.Screen name="Reservation" component={MyStackNavigator} />
          <Tab.Screen name="My" component={MyStackNavigator} />
        </>
      ) : (
        <Tab.Screen name="Sign In" component={SignIn} />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigation;
