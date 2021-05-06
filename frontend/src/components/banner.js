import React from 'react';
import { Card, Text, Button, Icon, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';

const Banner = ({status, message}) => {
  const theme = useTheme()

  return (
    <View style={{backgroundColor: theme[`color-${status}-500`], width: "100vw", justifyContent: 'center', textAlign: 'center', height: 40 }}>
      <Text style={{color: 'white'}}>{message}</Text>
    </View>
  );
}

export default Banner // tmeporary network error banner