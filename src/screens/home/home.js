import React, {useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TopHeaderView } from '../../components/common';
import customStyle from '../../../themes/styles';
import { useAuth } from '../auth/utils/authProvider';
import { Button, IndexPath } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import Template from '../../components/template';
import Searchbar from '../search/search';

const HomeScreen = ({ navigation }) => {
  const auth = useAuth();
  const fname = auth.state.token == null ? '' : auth.state.token.fname;
  const logout = () => auth.logout();
  const [filter, setFilter] = useState(new IndexPath(0));

  const homePage = (
    <>
      <TopHeaderView hasDrawer={true} title={`Hello ${fname}!`} />
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate(AppRoute.SEARCH, { filter: filter.row })} 
        
        activeOpacity={1}
        >
        <Searchbar filter={filter} setFilter={setFilter}/>
        </TouchableOpacity>
        <Button onPress={logout}>Logout</Button>
        {/* <Button onPress={() => navigation.navigate(AppRoute.PROFILE)}>
          Profile
        </Button> */}
      </View>
    </>
  );


  return <Template children={homePage} />;
};

export default HomeScreen;
