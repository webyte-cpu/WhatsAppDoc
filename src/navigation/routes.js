import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useAuth } from '../screens/auth/utils/authProvider';
import customFonts from '../../themes/custom-fonts';
import AppLoading from 'expo-app-loading';
import AuthNavigator from './navigatorStacks/authNavigator';
import DrawerStack from './navigatorStacks/drawerStack';

const AppNavigator = () => {
  const auth = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  if (fontsLoaded && auth.state.isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {auth.state.token == null ? <AuthNavigator /> : <DrawerStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
