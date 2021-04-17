import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, IndexPath, Text, useTheme } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { AppRoute } from '../../navigation/app-routes';
import Searchbar from '../search/search';
import customStyle from '../../../themes/styles';

const HomePage = ({ navigation }) => {
  const auth = useAuth();
  const {fname} = auth.state.token;
  const [filter, setFilter] = useState(new IndexPath(0));
  
  return (
    <View style={customStyle.contentFill}>
      <Text category='h1' style={{marginBottom: 10}}>Welcome, {fname}</Text>
      <Searchbar filter={filter} setFilter={setFilter} />
    </View>
  );
};

export default HomePage;
