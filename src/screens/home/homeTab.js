import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import HomeStackScreen from './homePage';
import ScheduleStackScreen from './schedulePage';
import NotificationStackScreen from './notificationPage';
import ProfileStackScreen from '../profile/profile';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from '../auth/utils/authProvider';

// import HomeNavigator from './homeNavigator';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name='home' />;
const CalendarIcon = (props) => <Icon {...props} name='calendar' />;
const NotificationIcon = (props) => <Icon {...props} name='bell' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    appearance="noIndicator"
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={CalendarIcon} />
    <BottomNavigationTab icon={NotificationIcon} />
  </BottomNavigation>
);

const TabScreen = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name={AppRoute.HOME} component={HomeStackScreen} />
    <BottomTab.Screen name={AppRoute.SCHEDULE} component={ScheduleStackScreen} />
    <BottomTab.Screen name={AppRoute.NOTIFICATION} component={NotificationStackScreen} />
  </BottomTab.Navigator>
);

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  img: {
    flex: 1,
    marginLeft: 10,
    marginTop: 70,
    padding: 10,
    width: 70,
    height: 70,
  },
  txt: {
    marginLeft: 90,
    color: 'black',
  }
})

const ProfileIcon = (props) => {
  const auth = useAuth();
  const fname = auth.state.token.fname;
  const email = auth.state.token.email;

  return (
    <View>
      <ImageBackground style={styles.img} source={require('../../../assets/user.png')} />
      <Text {...props} style={styles.txt} > {fname} </Text>
      <Text {...props} style={styles.txt} > {email} </Text>
    </View >
  )

}

const DrawerScreen = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => {
      return ( 
        <>
          <TouchableOpacity onPress={() => navigation.navigate(AppRoute.PROFILE)}>
            <ProfileIcon />
          </TouchableOpacity>
          <DrawerContent {...props} />
        </>
      )
    }}>
      <Drawer.Screen name="Home" component={TabScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerScreen;