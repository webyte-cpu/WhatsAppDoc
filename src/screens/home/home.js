import React from 'react';
import { View } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import { Search } from '../search/search';
import { useAuth } from '../auth/utils/authProvider';
import { Button } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import Template from '../../components/template';

const HomeScreen = ({ navigation }) => {
  const auth = useAuth();
  const fname = auth.state.token == null ? '' : auth.state.token.fname;
  console.log(auth.state);
  const logout = () => auth.logout();

  const homePage = (
    <>
      <TopHeaderView hasDrawer={true} title={`Hello ${fname}!`} />
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <Search />
        <Button onPress={logout}>Logout</Button>
        <Button onPress={() => navigation.navigate(AppRoute.PROFILE)}>
          Profile
        </Button>
      </View>
    </>
  );

  return <Template children={homePage} />;
};

export default HomeScreen;
