import React from "react";
import { View } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useAuth } from "../screens/auth/utils/authProvider";
import customFonts from "../../themes/custom-fonts";
import AppLoading from "expo-app-loading";
import AuthNavigator from "./navigatorStacks/authNavigator";
import AdminDrawerStack from "./navigatorStacks/adminStack";
import UserDrawerStack from "./navigatorStacks/userDrawer";
import enums from "../../helpers/enums";
import LoadingScreen from "../components/loadingScreen";
import Banner from "../components/banner";
import { navigationRef } from './rootNavigation'
import { useNotifications } from '../notification/notification'

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
      DoctorForm: "/resendform",
      AppointmentProperties: '/properties',
      Request: '/requests',
    },
  },
};

const AppNavigator = () => {
  const { appState } = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  useNotifications()
  
  if (appState.isLoading && !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} linking={linking}>
        {appState.user == null ? (
          <AuthNavigator />
        ) : appState.user.role === enums.role.ADMIN ? (
          <AdminDrawerStack />
        ) : (
          <UserDrawerStack />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
    </>
  );
};

export default AppNavigator;
//auth.token.role === enums.role.ADMIN ? <AdminDrawerStack /> :
