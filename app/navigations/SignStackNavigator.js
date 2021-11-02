import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const SignStack = createStackNavigator();

const SignStackNavigator = function () {
  return (
    <SignStack.Navigator
      initialRouteName="로그인"
    >
      <SignStack.Screen name="로그인" component={SignIn} />
      <SignStack.Screen name="회원가입" component={SignUp} />
    </SignStack.Navigator>
  );
};

export default SignStackNavigator;
