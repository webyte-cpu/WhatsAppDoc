import React from 'react';
import { View, Text } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import { Search } from '../search/search';
import { useAuth } from '../auth/utils/authProvider';
import Template from '../../components/template';
import { Drawer } from '../../components/drawer';
import { Button } from '@ui-kitten/components'

const HomePage = ({ navigation }) => {
  const auth = useAuth();
  const fname = auth.state.token == null ? '' : auth.state.token.fname;
  console.log(auth.state);
  const logout = () => auth.logout();

  const homePage = (
    <>
      <TopHeaderView navigation={navigation} hasDrawer={true} title={`Hello ${fname}!`} />
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <Search />
        <Button onPress={logout}>Logout</Button>
        {/* <Button onPress={() => navigation.navigate(AppRoute.PROFILE)}>
          Profile
        </Button> */}
      </View>
    </>
  );

  return <Template children={homePage} />;
};

const HomeScreen = () => {
  return (
    <Drawer children={HomePage} />
  )
}

export default HomeScreen;
