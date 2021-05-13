import React from "react";
import { View, ScrollView } from "react-native";
import { Tab, TabBar, useTheme } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import customStyle from "../../../../themes/styles";
import About from "./about";
import Availability from "./availability";
import Limits from "./limits";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => {
  const theme = useTheme();

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ backgroundColor: theme["color-primary-light"] }}
    >
      <Tab title="About" style={customStyle.tabStyle} />
      <Tab title="Availability" />
      <Tab title="Limits" />
    </TabBar>
  );
};

const AppointmentProperties = ({ route }) => {
  const theme = useTheme();
  const {
    roomNumber,
    address,
    minimumSchedulingNoticeMins,
    slotDurationInMins,
    consultationFee,
  } = route.params.initialValues
  
  console.log(route.params)
  
  return (
    <Navigator
      tabBar={(props) => <TopTabBar {...props} />}
      style={{ backgroundColor: theme["color-primary-light-600"] }}
    >
      <Screen name="About" component={About} initialParams={{consultationFee, address, roomNumber }}/>
      <Screen name="Availability" component={Availability} initialParams={{slotDurationInMins}} />
      <Screen name="Limits" component={Limits} initialParams={{minimumSchedulingNoticeMins}}/>
    </Navigator>
  );
};

export default AppointmentProperties;
