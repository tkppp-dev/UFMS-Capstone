import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClassRoom from '../screens/HomeScreens/Home';
import { View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Class Room" component={ClassRoom} />
    </Tab.Navigator>
  );
}

export default HomeTabNavigator;
