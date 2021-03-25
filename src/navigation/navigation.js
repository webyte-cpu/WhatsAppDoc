import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './app-routes';

const { Navigator, Screen } = createStackNavigator();

const navigationRoutes = (routes) => {
  return routes.map((route) => (
    <Screen key={route.name} name={route.name} component={route.component} />
  ))
}

const AppNavigator = (props) => (
  <Navigator {...props} headerMode="none">
    { navigationRoutes(routes) }
  </Navigator>
);

export default AppNavigator;