import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationHome from '../screens/ReservationScreens/ReservationHome';
import RentHome from '../screens/ReservationScreens/RentHome';
import RentNotice from '../screens/ReservationScreens/RentNotice';
import RentApplication from '../screens/ReservationScreens/RentApplication';
import ClassRentHome from '../screens/ReservationScreens/ClassRentHome';
import ClassRentNotice from '../screens/ReservationScreens/ClassRentNotice';
import ClassRentApplication from '../screens/ReservationScreens/ClassRentApplication';
import ReservationInquiry from '../screens/ReservationScreens/ReservationInquiry';
import WriteReservationInquiry from '../screens/ReservationScreens/WriteReservationInquiry';

const RentStack = createStackNavigator();

const RentStackNavigator = function () {
  return (
    <RentStack.Navigator
      initialRouteName="Rent Home"
      screenOptions={{
        headerStyle: {
          height: 50
        },
        headerTitleStyle: {
        }
      }}
    >
      <RentStack.Screen name="Rent Home" component={ReservationHome} />
      <RentStack.Screen name="Rent" component={RentHome} />
      <RentStack.Screen name="Rent Notice" component={RentNotice} />
      <RentStack.Screen name="Rent Application" component={RentApplication} />
      <RentStack.Screen
        name="Reservation Inquiry"
        component={ReservationInquiry}
      />
      <RentStack.Screen
        name="Write Reservation Inquiry"
        component={WriteReservationInquiry}
      />
      <RentStack.Screen name="Class Rent" component={ClassRentHome} />
      <RentStack.Screen name="Class Rent Notice" component={ClassRentNotice} />
      <RentStack.Screen
        name="Class Rent Application"
        component={ClassRentApplication}
      />
    </RentStack.Navigator>
  );
};

export default RentStackNavigator;
