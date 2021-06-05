import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import Notification from "../notification/notification.js"
import customStyle from '../../../themes/styles';

const NotificationPage = ({ navigation }) => {
  return (
    <View style={customStyle.content}>
      <Text>NOTIFICATION</Text>
      <Notification />
    </View>
  )
}

export default NotificationPage