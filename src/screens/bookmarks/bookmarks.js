import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { AppRoute } from '../../navigation/app-routes';

const Bookmarks = ({ navigation }) => {

  return (
    <View>
    <Text>Bookmarks</Text>
    <Button onPress={() => navigation.navigate(AppRoute.HOME)}>Home</Button>
  </View>
  )
}

export default Bookmarks;