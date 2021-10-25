import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const SignStack = createStackNavigator();

const SignStackNavigator = function () {
  return (
    <SignStack.Navigator
      initialRouteName="Sign In"
    >
      <SignStack.Screen name="Sign In" component={SignIn} />
      <SignStack.Screen name="Sign Up" component={SignUp} />
    </SignStack.Navigator>
  );
};

export default SignStackNavigator;
