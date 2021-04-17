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

import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: "https://graphql-pokemon.now.sh/",
//   cache
// });



const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
          <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider {...eva} 
      theme={{ ...eva.light, ...theme }}
      >
        <AppNavigator/>
      </ApplicationProvider>
      </ApolloProvider>

    </>
  )
};


export default App
