import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabView from '../screens/HomeScreens/HomeTabView'
import ClassRoomUsage from '../screens/HomeScreens/ClassRoomUsage';
import RentalUsage from '../screens/HomeScreens/RentalUsage'

const HomeStack = createStackNavigator();

const HomeStackNavigator = function () {
  return (
    <HomeStack.Navigator initialRouteName="HomeStack">
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="HomeTabView"
        component={HomeTabView}
      />
      <HomeStack.Screen name="ClassRoom Usage" component={ClassRoomUsage} />
      <HomeStack.Screen name="Rental Usage" component={RentalUsage} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
