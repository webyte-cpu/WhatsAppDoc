import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading'
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
import AppNavigator from './src/navigation/navigation';
import { AppRoute } from './src/navigation/app-routes';
import { NavigationContainer } from '@react-navigation/native';
import customFonts from './themes/custom-fonts';

const App = () => {
  const [fontsLoaded] = useFonts(customFonts);

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator initialRouteName={AppRoute.LOGIN.name}/>
        </NavigationContainer>
      </SafeAreaProvider>
      </ApplicationProvider>
    </>
  )
};

export default App;
