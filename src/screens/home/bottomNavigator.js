import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import HomeStackScreen from './homePage';
import ScheduleStackScreen from './schedulePage';
import NotificationStackScreen from './notificationPage';
import ProfileStackScreen from '../profile/profile';
import { AppRoute } from '../../navigation/app-routes';
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

const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabScreen}  />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
)

export default DrawerScreen;