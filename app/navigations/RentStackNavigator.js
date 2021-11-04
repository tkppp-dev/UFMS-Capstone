import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RentReservation from '../screens/reservationScreens/RentReservation';
import RentNotice from '../screens/reservationScreens/RentNotice';
import RentApplication from '../screens/reservationScreens/RentApplication'

const RentStack = createStackNavigator();

const RentStackNavigator = function () {
  return (
    <RentStack.Navigator>
      <RentStack.Screen
        options={{ headerShown: false }}
        name="Rent"
        component={RentReservation}
      />
      <RentStack.Screen name="Rent Notice" component={RentNotice} />
      <RentStack.Screen name="Rent Application" component={RentApplication} />
    </RentStack.Navigator>
  );
};

export default RentStackNavigator;
