import React from 'react';
import { View, Text } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import { Search } from '../search/search';
import { useAuth } from '../auth/utils/authProvider';
import { Drawer } from '../../components/drawer';
import { Button } from '@ui-kitten/components'
import { BottomNav } from '../../components/bottomNav'
import NotificationPage from './notificationPage'
import SchedulePage from './schedulePage'

const Home = ({ navigation }) => {
  const auth = useAuth();
  const fname = auth.state.token == null ? '' : auth.state.token.fname;
  console.log(auth.state);
  const logout = () => auth.logout();

  const HomePage = () => {
    return(
      <>
      <TopHeaderView navigation={navigation} hasDrawer={true} title={`Hello ${fname}!`} />
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <Search />
        <Button onPress={logout}>Logout</Button>
      </View>
    </>
    )
  };
  
  return <BottomNav home={HomePage} schedule={SchedulePage} notification={NotificationPage} />
  
};

const HomeScreen = () => {
  return <Drawer children={Home} />
}

export default HomeScreen;
