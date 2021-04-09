import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from '../app-routes';
import LoginScreen from '../../screens/auth/login';
import SignupScreen from '../../screens/auth/signup';
import ForgotPassword from '../../screens/auth/forgotPassword';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={AppRoute.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name={AppRoute.SIGNUP} component={SignupScreen} options={{ title: 'Sign up'}}/>
      <AuthStack.Screen name={AppRoute.FORGOT_PASS} component={ForgotPassword} options={{ title: 'Forgot Password' }} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator;