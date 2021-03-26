import React from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading'
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
import AppNavigator from './src/navigation/navigation';
import { AppRoute } from './src/navigation/app-routes';
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
        <AppNavigator initialRouteName={AppRoute.LOGIN.name}/>
      </ApplicationProvider>
    </>
  )
};

export default App;
