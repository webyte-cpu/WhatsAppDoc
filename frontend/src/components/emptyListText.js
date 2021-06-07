import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

const EmptyListText = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
    <Text appearance="hint" category="s1">Nothing to Display</Text>
  </View>
)

export default EmptyListText;