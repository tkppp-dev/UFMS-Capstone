import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RentReservation from '../screens/RentReservation';
import RentNotice from '../screens/RentNotice';
import RentApplication from '../screens/RentApplication'

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
