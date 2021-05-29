import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MedicalRecordPage , Category} from '../../screens/medical_record/medicalRecordPage';
import { AppRoute } from '../app-routes';

const MedicalRecordStack = createStackNavigator();

const MedicalRecordStackScreen = () => (
  <MedicalRecordStack.Navigator>
    <MedicalRecordStack.Screen name={AppRoute.MEDICAL_REC} component={MedicalRecordPage} options={{title: 'Medical Record'}} />
    <MedicalRecordStack.Screen name={AppRoute.CATEGORY} component={Category} />
  </MedicalRecordStack.Navigator>
);

export default MedicalRecordStackScreen;