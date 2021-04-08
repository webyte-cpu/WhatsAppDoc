import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

import customStyle from '../../../themes/styles';

const NotificationPage = ({ navigation }) => {
  return (
    <View style={customStyle.content}>
      <Text>NOTIFICATION</Text>
    </View>
  )
}

export default NotificationPage