import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import {useFonts} from 'expo-font';
import { default as theme } from './themes/custom-theme.json';
import { default as mapping } from './mapping.json';
import AppLoading from 'expo-app-loading'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LoginScreen from './src/components/loginScreen';
import { AppNavigator } from './src/components/navigation';
import SignupScreen from './src/components/signup';

const App = () => {
  return (
    <>
      <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider {...eva} 
      theme={{ ...eva.light, ...theme }}
      >
        <AppNavigator/>
        {/* <SignupScreen/> */}
      </ApplicationProvider>
      
    </>
  )
};


export default App
