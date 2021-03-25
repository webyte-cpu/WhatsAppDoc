import React from 'react';
import { SafeAreaView } from 'react-native';
import { TopNavigation, Button, Divider, Layout, Text } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';

const HomeScreen = ({ navigation }) => {
  
  const logout = () => navigation.navigate(AppRoute.LOGIN.name)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button onPress={logout}>Logout</Button>
      </Layout> 
    </SafeAreaView>
  );
};

export default HomeScreen;