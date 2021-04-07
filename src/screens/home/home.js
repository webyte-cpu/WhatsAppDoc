import React, {useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import { useAuth } from '../auth/utils/authProvider';
import { Button, IndexPath } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import Template from '../../components/template';
import Searchbar from '../search/search';
import { Drawer } from '../../components/drawer';
import { Button } from '@ui-kitten/components'
import { BottomNav } from '../../components/bottomNav'
import NotificationPage from './notificationPage'
import SchedulePage from './schedulePage'

const Home = ({ navigation }) => {
  const auth = useAuth();
  const fname = auth.state.token == null ? '' : auth.state.token.fname;
  const logout = () => auth.logout();
  const [filter, setFilter] = useState(new IndexPath(0));

  const HomePage = () => {
    return(
      <>
      <TopHeaderView navigation={navigation} hasDrawer={true} title={`Hello ${fname}!`} />
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate(AppRoute.SEARCH, { filter: filter.row })} 
        
        activeOpacity={1}
        >
        <Searchbar filter={filter} setFilter={setFilter}/>
        </TouchableOpacity>
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
