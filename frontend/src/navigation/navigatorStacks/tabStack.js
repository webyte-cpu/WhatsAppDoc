import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Icon,
} from "@ui-kitten/components";
import HomeStackScreen from "./homeStack";
import ScheduleStackScreen from "./scheduleStack";
import NotificationStackScreen from "./notificationStack";
import { PropertiesFormProvider } from "../../screens/schedules/properties/formProvider";

const BottomTab = createBottomTabNavigator();

const HomeIcon = (props) => <Icon {...props} name="home" />;
const CalendarIcon = (props) => <Icon {...props} name="calendar" />;
const NotificationIcon = (props) => <Icon {...props} name="bell" />;

const BottomTabBar = (
  { navigation, state } // ui
) => (
  <>
    <Divider />
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator"
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={CalendarIcon} />
      <BottomNavigationTab icon={NotificationIcon} />
    </BottomNavigation>
  </>
);

const TabStack = () => (
  <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="HomeStack" component={HomeStackScreen} />
    <BottomTab.Screen name="ScheduleStack" component={PropertiesFormProvider} />
    <BottomTab.Screen
      name="NotificationStack"
      component={NotificationStackScreen}
    />
  </BottomTab.Navigator>
);

export default TabStack;
