import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useAuth } from '../screens/auth/utils/authProvider';
import customFonts from '../../themes/custom-fonts';
import AppLoading from 'expo-app-loading';
import AuthNavigator from './navigatorStacks/authNavigator';
import AdminDrawerStack from './navigatorStacks/adminStack';
import UserDrawerStack from './navigatorStacks/userDrawer';
import enums from '../../helpers/enums';
import { Button, Text, Spinner } from '@ui-kitten/components';

const linking = {
  config: { 
    screens: { 
      SignIn: "/signin", 
      Signup: "/signup",
      ForgotPass: "/forgotpassword",
      AdminHome: "/admin",
      Home: "/home",
      Search: "/search",
      Schedules: "/schedules",
      Notification: "/notif",
      Profile: "/profile",
      DoctorForm: "/resendform"
    },
  },
};

const AppNavigator = () => {
  const auth = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  if (fontsLoaded && auth.isLoading) { // TODO : loading
    return <Spinner testID="spinner" status="primary" size="giant" />;;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {auth.token == null ? <AuthNavigator /> :  <UserDrawerStack />} 
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
//auth.token.role === enums.role.ADMIN ? <AdminDrawerStack /> :