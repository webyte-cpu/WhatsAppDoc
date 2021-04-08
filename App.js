import * as React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
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
    </>
  );
};

export default App;
