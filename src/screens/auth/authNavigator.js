import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../../navigation/app-routes';
import LoginScreen from './login';
import SignupScreen from './signup';
import ForgotPassword from './forgotPassword';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={AppRoute.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name={AppRoute.SIGNUP} component={SignupScreen} options={{ title: 'Sign up' }} />
      <AuthStack.Screen name={AppRoute.FORGOT_PASS} component={ForgotPassword} options={{ title: 'Forgot Password' }} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator;