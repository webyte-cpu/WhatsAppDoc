import React from 'react';
import { SafeAreaView } from 'react-native';
import { TopNavigation, Button, Divider, Layout, Text } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import { AuthContext } from '../auth/context';



const HomeScreen = ({ navigation }) => {

  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button onPress={signOut}>Logout</Button>
      </Layout> 
    </SafeAreaView>
  );
};

export default HomeScreen;