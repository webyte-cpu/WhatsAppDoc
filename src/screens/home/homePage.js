import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { AppRoute } from '../../navigation/app-routes';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer';

const HomeStack = createStackNavigator();

const HomePage = ({ navigation }) => {
  const auth = useAuth();
  return (
    <View>
      <Text>
        Homepage
        <Button onPress={() => auth.logout()}>Logout</Button>
        <Button onPress={() => navigation.navigate(AppRoute.SEARCH)}>Search</Button>
      </Text>
    </View>
  )
}

const HomeStackScreen = (props) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomePage}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
  </HomeStack.Navigator>
)

export default HomeStackScreen;