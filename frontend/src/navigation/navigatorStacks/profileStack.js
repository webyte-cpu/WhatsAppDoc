import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import ProfilePage from '../../screens/profile/profilePage';
import MedicalRecordStackScreen from './medicalRecordStack';
import { AppRoute } from '../app-routes';
import { useWindowDimensions } from 'react-native';
import breakpoints from '../../utils/breakpoints';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = (props) => {
  const dimensions = useWindowDimensions();
  
  return (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name={AppRoute.PROFILE}
      component={ProfilePage}
      options={{
        headerLeft: () => {
          if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
        },
      }}
    />
    {/* <ProfileStack.Screen
      name={AppRoute.MEDICAL_REC}
      component={MedicalRecordStackScreen}
      options={{headerShown:false}}
    /> */}
  </ProfileStack.Navigator>
)}

export default ProfileStackScreen;