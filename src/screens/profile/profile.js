import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from '../auth/utils/authProvider';
import { Drawer } from '../../components/drawer';


const Profile = ({ navigation }) => {
  const auth = useAuth()
  const userEmail = auth.state.token.email

  const profile = (
    <>
      <TopHeaderView navigation={navigation} hasDrawer={false} backTo={navigation}>
        <View style={{ ...customStyle.content, marginTop: 10 }}>
          <Text>Profile</Text>
          <Text>{userEmail}</Text>
          <Button onPress={() => navigation.navigate(AppRoute.HOME)}>Home</Button>
        </View>
      </TopHeaderView>
    </>
  )
  return (
    <Template children={profile} />
  )
}
const ProfileScreen = () => {
  return (
    <Drawer children={Profile} />
  )
}

export default ProfileScreen;