import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import customStyle from '../../../themes/styles';
import { AppRoute } from '../app-routes';
import HomePage from '../../screens/home/homePage';

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {

  return (
    <HomeStack.Navigator initialRouteName={AppRoute.HOME} screenOptions={{headerStyle: customStyle.headerStyle}}> 
      <HomeStack.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          headerLeft: () => <DrawerMenuBtn props={props} />
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
