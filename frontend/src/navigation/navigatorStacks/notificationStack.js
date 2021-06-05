import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import NotificationPage from '../../screens/home/notificationPage';
import { AppRoute } from '../app-routes';
import { View, useWindowDimensions } from 'react-native';
import breakpoints from '../../utils/breakpoints';

const NotificationStack = createStackNavigator();

const NotificationStackScreen = (props) => {
  const dimensions = useWindowDimensions();
  
  return (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name={AppRoute.NOTIFICATION}
      component={NotificationPage}
      options={{
        headerLeft: () => {
          if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
        },
      }}
    />
  </NotificationStack.Navigator>
)}

export default NotificationStackScreen