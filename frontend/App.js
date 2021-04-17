import * as React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
<<<<<<< HEAD
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

=======
import AppNavigator from './src/navigation/routes';
import { AuthProvider } from './src/screens/auth/utils/authProvider';
import { StatusBar } from 'expo-status-bar';
const App = () => {
  return (
    <>
      <AuthProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <StatusBar translucent={true} />
          <AppNavigator />
        </ApplicationProvider>
      </AuthProvider>
>>>>>>> c264bc0fed32eb71472237bd7d1ac57a40a2d4c1
    </>
  );
};

export default App;
