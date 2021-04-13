import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import ProfilePage from '../../screens/profile/profilePage';
import MedicalRecordStackScreen from './medicalRecordStack';
import { AppRoute } from '../app-routes';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = (props) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name={AppRoute.PROFILE}
      component={ProfilePage}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
    <ProfileStack.Screen
      name={AppRoute.MEDICAL_REC}
      component={MedicalRecordStackScreen}
      options={{headerShown:false}}
    />
  </ProfileStack.Navigator>
)

export default ProfileStackScreen;