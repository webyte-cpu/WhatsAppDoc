import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) =>  <Icon {...props} name='home' /> ;
const CalendarIcon = (props) => <Icon {...props} name='calendar' /> ;
const NotificationIcon = (props) => <Icon {...props} name='bell' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    appearance="noIndicator"
  >
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={CalendarIcon}/>
    <BottomNavigationTab icon={NotificationIcon}/>
  </BottomNavigation>
);

const TabNavigator = ({home,schedule,notification}) => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={home}/>
    <Screen name='Schedule' component={schedule}/>
    <Screen name='Notification' component={notification}/>
  </Navigator>
);

export const BottomNav = ({home,schedule,notification}) => (
    <TabNavigator home={home} schedule={schedule} notification={notification}/>
);