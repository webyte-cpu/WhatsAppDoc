import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from '../auth/utils/authProvider';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer';
import MedicalRecordStackScreen from '../medical_record/medRec'

const ProfileStack = createStackNavigator();

const Profile = ({ navigation }) => {
  const auth = useAuth()
  const userEmail = auth.state.token.email

  const profile = (
    <>
      {/* <TopHeaderView navigation={navigation} hasDrawer={false} backTo={navigation}> */}
        <View style={{ ...customStyle.content, marginTop: 10 }}>
          <Text>Profile</Text>
          <Text>{userEmail}</Text>
          <Button onPress={() => navigation.navigate(AppRoute.MEDICAL_REC)}>Medical Record</Button>
        </View>
      {/* </TopHeaderView> */}
    </>
  )
  return (
    <Template children={profile} />
    // {profile}
  )
}
// const ProfileScreen = () => {
//   return (
//     <Drawer children={Profile} />
//   )
// }

const ProfileStackScreen = (props) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
    <ProfileStack.Screen
      name="MedRec"
      component={MedicalRecordStackScreen}
      options={{headerShown:false}}
    />
  </ProfileStack.Navigator>
)

export default ProfileStackScreen;