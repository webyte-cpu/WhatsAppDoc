import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer';
import customStyle from '../../../themes/styles';

const NotificationStack = createStackNavigator();

const NotificationPage = ({ navigation }) => {
  return (
    <View style={customStyle.content}>
      <Text>NOTIFICATION</Text>
    </View>
  )
}

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