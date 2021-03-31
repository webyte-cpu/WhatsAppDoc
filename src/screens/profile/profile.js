import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from '../auth/utils/authProvider';

const Profile = ({ navigation }) => {
  const auth = useAuth()
  const userEmail = auth.state.token.email

  const profile = (
    <View>
      <Text>Profile</Text>
      <Text>{userEmail}</Text>
      <Button onPress={() => navigation.navigate(AppRoute.HOME)}>Home</Button>
    </View>
  )
  return (
    <Template children={profile} />
  )
}

export default Profile;