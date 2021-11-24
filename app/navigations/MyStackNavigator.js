import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfessorMyPage from '../screens/MyPageScreens/ProfessorMyPage';
import StudentMyPage from '../screens/MyPageScreens/StudentMyPage';
import WeekSchedule from '../screens/MyPageScreens/WeekSchedule';

const MyStack = createStackNavigator();

const MyStackNavigator = function () {
  return (
    <MyStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        headerBackTitleVisible: false
      }}
    >
      <MyStack.Screen name="MyStack" component={ProfessorMyPage} />
      <MyStack.Screen name="Schedule" component={WeekSchedule} />
    </MyStack.Navigator>
  );
};

export default MyStackNavigator;
