import React from 'react';
import { Text, Input } from '@ui-kitten/components';
import { View, StyleSheet, Platform } from 'react-native';

const suffix = (suffix) => {
  return <Text category='s1'>{suffix}</Text>
}

const About = () => {
  return (
    <View style={styles.container}>
      <Text category='h6'>Minimum Scheduling Notice</Text>
      <Input
      style={{marginVertical:10}}
      accessoryRight={ () => suffix('HOURS')}
      caption='Use this settings to prevent last-minute meetings. Set the minimum amount of notice required before appointments.'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor:'white',
    height:'100%'
  }
})

export default About 

