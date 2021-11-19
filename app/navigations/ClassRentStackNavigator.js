import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClassRentReservation from '../screens/reservationScreens/ClassRentReservation';
import ClassRentNotice from '../screens/reservationScreens/ClassRentNotice';
import ClassRentApplication from '../screens/reservationScreens/ClassRentApplication'

const ClassRentStack = createStackNavigator();

const ClassRentStackNavigator = function () {
  return (
    <ClassRentStack.Navigator>
      <ClassRentStack.Screen
        options={{ headerShown: false }}
        name="Class Rent"
        component={ClassRentReservation}
      />
      <ClassRentStack.Screen name="Class Rent Notice" component={ClassRentNotice} />
      <ClassRentStack.Screen name="Class Rent Application" component={ClassRentApplication} />
    </ClassRentStack.Navigator>
  );
};

export default ClassRentStackNavigator;