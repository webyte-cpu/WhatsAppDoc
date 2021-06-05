import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import customStyle from '../../../themes/styles';
import { AppRoute } from '../app-routes';
import HomePage from '../../screens/home/homePage';
import DoctorForm from '../../screens/home/doctorForm'
import SearchPage from '../../screens/search/searchPage';
import breakpoints from '../../utils/breakpoints';

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {
  const dimensions = useWindowDimensions();

  return (
    <HomeStack.Navigator initialRouteName={AppRoute.HOME} screenOptions={{ headerStyle: customStyle.headerStyle }}>
      <HomeStack.Screen
        name={AppRoute.HOME}
        component={HomePage}
        options={{
          headerLeft: () => {
            if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
          },
        }}
      />
      <HomeStack.Screen
        name={AppRoute.DOCTOR_FORM}
        component={DoctorForm}
      />
      <HomeStack.Screen
        name={AppRoute.SEARCH}
        component={SearchPage}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
