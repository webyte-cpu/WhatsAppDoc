import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import NotificationPage from '../../screens/home/notificationPage';

const NotificationStack = createStackNavigator();

const NotificationStackScreen = (props) => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="Notification"
      component={NotificationPage}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
  </NotificationStack.Navigator>
)

export default NotificationStackScreen