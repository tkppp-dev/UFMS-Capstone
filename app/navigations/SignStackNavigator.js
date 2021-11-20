import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignScreens/SignIn';
import SignUp from '../screens/SignScreens/SignUp';

const SignStack = createStackNavigator();

const SignStackNavigator = function () {
  return (
    <SignStack.Navigator
      initialRouteName="로그인"
      screenOptions={{
        headerStyle: {
          height: 50,
        },
        headerTitleStyle: {},
      }}
    >
      <SignStack.Screen name="로그인" component={SignIn} />
      <SignStack.Screen name="회원가입" component={SignUp} />
    </SignStack.Navigator>
  );
};

export default SignStackNavigator;
