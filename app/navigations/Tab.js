import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import MyStackNavigator from './MyStackNavigator';
import SignStackNavigator from './SignStackNavigator';
import RentStackNavigator from './RentStackNavigator';
import { Context } from '../src/context/index';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
/**
  <Tab.Screen
            name="Notification"
            component={MyStackNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon type="antdesign" name="bells" color={color} size={25} />
              ),
              tabBarBadge: 4,
            }}
          />
 */

const TabNavigation = function () {
  const { state } = useContext(Context);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="antdesign"
              name="home"
              color={color}
              size={25}
              containerStyle={{ marginVertical: 5 }}
            />
          ),
        }}
      />
      {state.user.isLogin ? (
        <>
          <Tab.Screen
            name="Reservation"
            component={RentStackNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  type="material-community"
                  name="calendar-edit"
                  color={color}
                  size={28}
                  containerStyle={{ marginVertical: 5 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MY"
            component={MyStackNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon type="antdesign" name="user" color={color} size={25} />
              ),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Sign"
          component={SignStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon type="antdesign" name="user" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigation;
