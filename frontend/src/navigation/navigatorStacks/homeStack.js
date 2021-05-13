import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import customStyle from '../../../themes/styles';
import { AppRoute } from '../app-routes';
import HomePage from '../../screens/home/homePage';
import DoctorForm from '../../screens/home/doctorForm'

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {

  return (
    <HomeStack.Navigator initialRouteName={AppRoute.HOME} screenOptions={{ headerStyle: customStyle.headerStyle }}>
      <HomeStack.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          headerLeft: () => <DrawerMenuBtn props={props} />
        }}
      />
      <HomeStack.Screen
        name={AppRoute.DOCTOR_FORM}
        component={DoctorForm}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
