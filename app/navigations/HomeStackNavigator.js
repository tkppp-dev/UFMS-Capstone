import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';

const HomeStack = createStackNavigator();

const HomeStackNavigator = function () {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeStack" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator