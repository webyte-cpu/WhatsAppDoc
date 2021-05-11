import React from "react";
import { Tab, TabBar, useTheme, Divider } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppointmentScreen from "./appointmentScreen";
import ClinicPage from "./clinic";
import customStyle from "../../../themes/styles";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => {
  const theme = useTheme();

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ backgroundColor: theme["color-primary-light"] }}
    >
      <Tab title="Appointments" style={customStyle.tabStyle} />
      <Tab title="Clinics" />
    </TabBar>
  );
};

const DoctorScheduleNavigator = () => {
  const theme = useTheme();

  return (
    <Navigator
      tabBar={(props) => <TopTabBar {...props} />}
      style={{ backgroundColor: theme["color-primary-light-600"] }}
    >
      <Screen name="Appointments" component={AppointmentScreen} />
      <Screen name="Clinics" component={ClinicPage} />
    </Navigator>
  );
};

export default DoctorScheduleNavigator;
