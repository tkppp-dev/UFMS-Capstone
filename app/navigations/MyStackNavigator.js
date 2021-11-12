import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule from '../screens/myPageScreen/ProfessorMyPage';

const MyStack = createStackNavigator();

const MyStackNavigator = function () {
  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="MyStack" component={Schedule} />
    </MyStack.Navigator>
  );
};

export default MyStackNavigator