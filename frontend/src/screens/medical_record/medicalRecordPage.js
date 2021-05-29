import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { AppRoute } from '../../navigation/app-routes';

const MedicalRecordPage = ({ navigation }) => {
  return (
    <View>
      <Text>Medical Records</Text>
      <Button onPress={() => navigation.navigate(AppRoute.CATEGORY)}>
        Category
      </Button>
    </View>
  );
};

const Category = () => {
  return (
    <View>
      <Text>Category</Text>
    </View>
  );
};

export { MedicalRecordPage, Category }; // TODO: re-edit, current state is for navigation testing only

