import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, IndexPath, Text, useTheme, Card } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { AppRoute } from '../../navigation/app-routes';
import Searchbar from '../search/search';
import customStyle from '../../../themes/styles';
import Admin from '../Admin/admin.js'

const HomePage = ({ navigation }) => {
  const auth = useAuth();
  console.log(auth)
  // const {fname} = auth.state.token;
  const [filter, setFilter] = useState(new IndexPath(0));

  return (
    <View style={customStyle.contentFill}>
      <Text testID='welcome-header' category='h1' style={{ marginBottom: 10 }}>Welcome!</Text>
      <Searchbar filter={filter} setFilter={setFilter} />
      <Card style={customStyle.warningCard} status='warning'>
        <Text>
          Uh oh! Looks like your verification request has been rejected but you can send another request here.
        </Text>
        <Button  onPress={() => navigation.navigate(AppRoute.DOCTOR_FORM)}>Edit and Resend Form</Button>
      </Card>
    </View>
  );
};

export default HomePage;
