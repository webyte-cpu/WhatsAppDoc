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

const linking = {
  config: { 
    screens: { 
      Login: "/login", 
      Signup: "/signup",
      ForgotPass: "/forgotpassword",
      AdminHome: "/admin",
      Home: "/home",
      Search: "/search",
      Schedules: "/schedules",
      Notification: "/notif",
      Profile: "/profile"
    },
  },
};

const AppNavigator = () => {
  const auth = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  if (fontsLoaded && auth.state.isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {auth.state.token == null ? <AuthNavigator /> : auth.state.token.role === 'admin' ? <AdminDrawerStack /> : <UserDrawerStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
