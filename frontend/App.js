import * as React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
import AppNavigator from './src/navigation/routes';
import { AuthProvider } from './src/screens/auth/utils/authProvider';
import { StatusBar } from 'expo-status-bar';

<<<<<<< HEAD
import { AppRegistry } from 'react-native';
=======
>>>>>>> d10ef718480e892e7bdfa4d0f9a7459161525e42
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  }
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <StatusBar translucent={true} />
            <AppNavigator />
          </ApplicationProvider>
        </AuthProvider>
      </ApolloProvider>
<<<<<<< HEAD

=======
>>>>>>> d10ef718480e892e7bdfa4d0f9a7459161525e42
    </>
  );
};

export default App;
