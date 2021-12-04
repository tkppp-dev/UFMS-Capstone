import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from '../screens/MyPageScreens/Mypage';
import WeekSchedule from '../screens/MyPageScreens/WeekSchedule';
import SubjectManagement from '../screens/MyPageScreens/SubjectManagement';
import LabManagement from '../screens/MyPageScreens/LabManagement';
import RentalManagement from '../screens/MyPageScreens/RentalManagement';

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
      <MyStack.Screen name="MyStack" component={Mypage} />
      <MyStack.Screen name="Schedule" component={WeekSchedule} />
      <MyStack.Screen name="Schedule Register" component={SubjectManagement} />
      <MyStack.Screen name="Lab Management" component={LabManagement} />
      <MyStack.Screen name="Rental Management" component={RentalManagement} />
    </MyStack.Navigator>
  );
};

export default MyStackNavigator;
