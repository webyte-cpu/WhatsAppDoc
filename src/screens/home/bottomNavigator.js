import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import SchedulePage from './schedulePage';
import NotificationPage from './notificationPage';
import { AppRoute } from '../../navigation/app-routes';
import HomePage from './homePage';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer';
import HomeNavigator from './homeNavigator';

const BottomTab = createBottomTabNavigator();
const BottomTabStack = createStackNavigator();


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

const BottomNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name={AppRoute.HOME} component={HomePage} />
    <BottomTab.Screen name={AppRoute.SCHEDULE} component={SchedulePage} />
    <BottomTab.Screen name={AppRoute.NOTIFICATION} component={NotificationPage} />
  </BottomTab.Navigator>
)

const BottomTabs = () => (
  <BottomTabStack.Navigator>
    <BottomTabStack.Screen name='BottomTabs' component={BottomNavigator} options={{
      title: '', 
      headerLeft: () => <DrawerMenuBtn />,
      headerLeftContainerStyle: { paddingHorizontal: 10 }
    }} />
  </BottomTabStack.Navigator>
)

export default BottomTabs;