import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout, Text, Input, Icon, Card } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';

const ForgotPassword = ({ navigation }) => {
  const logout = () => navigation.navigate(AppRoute.LOGIN.name)

  return (
    <SafeAreaView>
      <Text>Forgot Password</Text>
      <Button onPress={logout}>Logout</Button>
    </SafeAreaView>
  )
}

export default ForgotPassword;