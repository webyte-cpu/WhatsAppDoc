import React from 'react';
import { Icon, useTheme } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoute } from './app-routes';
import { useFonts } from 'expo-font';
import { useAuth } from '../screens/auth/utils/authProvider';
import customFonts from '../../themes/custom-fonts';
import AppLoading from 'expo-app-loading';
import AuthNavigator from '../screens/auth/authNavigator';
import BottomTabs from '../screens/home/homeTab';

const AppNavigator = () => {
  const theme = useTheme();
  const auth = useAuth();
  const [fontsLoaded] = useFonts(customFonts);


  if (fontsLoaded && auth.state.isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {auth.state.token == null ? <AuthNavigator /> : <BottomTabs />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
