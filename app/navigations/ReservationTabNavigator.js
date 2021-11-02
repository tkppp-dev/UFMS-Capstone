import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RentStackNavigator from './RentStackNavigator';
import Ask from '../screens/Ask';
import ClassReservation from '../screens/ClassReservation';

const ReservationTab = createMaterialTopTabNavigator()

const ReservationTabNavigator = function(){
  const userType = 'professor'
  return (
    <ReservationTab.Navigator>
      <ReservationTab.Screen name="대관" component={RentStackNavigator}/>
      { userType === 'professor' ? <ReservationTab.Screen name="강의실 예약" component={ClassReservation} /> : null}
      <ReservationTab.Screen name="문의" component={Ask}/>
    </ReservationTab.Navigator>
  )
}

export default ReservationTabNavigator