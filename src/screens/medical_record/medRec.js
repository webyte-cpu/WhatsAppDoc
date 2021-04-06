import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';

const MedRec = ({ navigation }) => {

  const medrec = (
    <View>
      <Text>Medical Records</Text>
      <Button onPress={() => navigation.navigate(AppRoute.HOME)}>Home</Button>
    </View>
  )
  return (
    <Template children={medrec} />
  )
}

export default MedRec;