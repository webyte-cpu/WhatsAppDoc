import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { routes } from './app-routes';

const { Navigator, Screen } = createStackNavigator();

const navigationRoutes = (routes) => {
  return routes.map((route) => (
    <Screen key={route.name} name={route.name} component={route.component} />
  ))
}

const linking = {
  config: {
    Home: "home",
    Login: "",
    Signup: "signup",
    ForgotPass: "forgotpass",
  }
}

const AppNavigator = (props) => (
  <SafeAreaProvider>
    <NavigationContainer linking={linking}>
      <Navigator {...props} headerMode="none">
        { navigationRoutes(routes) }
      </Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default AppNavigator;