import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../app-routes';
import SignupScreen from '../../screens/auth/signup';
import ForgotPassword from '../../screens/auth/forgotPassword';
import SignInScreen from '../../screens/auth/login';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName={AppRoute.SIGNIN}>
      <AuthStack.Screen name={AppRoute.SIGNIN} component={SignInScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name={AppRoute.SIGNUP} component={SignupScreen} options={{ title: 'Sign up'}}/>
      <AuthStack.Screen name={AppRoute.FORGOT_PASS} component={ForgotPassword} options={{ title: 'Forgot Password' }} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator;