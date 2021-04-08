import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';
import { createStackNavigator } from '@react-navigation/stack';

const MedicalRecordStack = createStackNavigator();

const MedRec = ({ navigation }) => {

  const medrec = (
    <View>
      <Text>Medical Records</Text>
      <Button onPress={() => navigation.navigate(AppRoute.CATEGORY)}>Category</Button>
    </View>
  )
  return (
    <Template children={medrec} />
  )
}

const Category = () => {
  return (
    <View>
      <Text>Category</Text>
    </View>
  )
}

const MedicalRecordStackScreen = () => (
  <MedicalRecordStack.Navigator>
    <MedicalRecordStack.Screen name="Medical Record" component={MedRec} />
    <MedicalRecordStack.Screen name="Category" component={Category} />
  </MedicalRecordStack.Navigator>
)

export default MedicalRecordStackScreen;