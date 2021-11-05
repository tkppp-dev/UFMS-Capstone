import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationInquiry from '../screens/reservationScreens/ReservationInquiry';
import WriteReservationInquiry from '../screens/reservationScreens/WriteReservationInquiry'

const RerservationInquiryStack = createStackNavigator();

const ReservationInquiryStackNavigator = function () {
  return (
    <RerservationInquiryStack.Navigator>
      <RerservationInquiryStack.Screen name="Reservation Inquiry" component={ReservationInquiry} />
      <RerservationInquiryStack.Screen name="Write Reservation Inquiry" component={WriteReservationInquiry} />
    </RerservationInquiryStack.Navigator>
  );
};

export default ReservationInquiryStackNavigator;
