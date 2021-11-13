import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfessorMyPage from '../screens/myPageScreen/ProfessorMyPage';
import StudentMyPage from '../screens/myPageScreen/StudentMyPage'
import WeekSchedule from '../screens/myPageScreen/WeekSchedule';

const MyStack = createStackNavigator();

const MyStackNavigator = function () {
  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="MyStack" component={StudentMyPage} />
      <MyStack.Screen name="Schedule" component={WeekSchedule} />
    </MyStack.Navigator>
  );
};

export default MyStackNavigator