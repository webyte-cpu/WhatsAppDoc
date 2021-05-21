import React, { useEffect } from "react";
import { Tab, TabBar, useTheme } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import customStyle from "../../../../themes/styles";
import About from "./about";
import Availability from "./availability";
import Limits from "./limits";
import { usePropertiesForm } from "./formProvider";

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

const AppointmentProperties = ({ navigation, route }) => {
  const theme = useTheme();
  const form = usePropertiesForm();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        title: form.initialValues.clinicName,
      });

      // form.resetValues();
    });

    return unsubscribe;
  }, [navigation]);

console.log(form)
  return (
    <Navigator
      tabBar={(props) => <TopTabBar {...props} />}
      style={{ backgroundColor: theme["color-primary-light-600"] }}
    >
      <Screen name="About" component={About} />
      <Screen name="Availability" component={Availability} />
      <Screen name="Limits" component={Limits} />
    </Navigator>
  );
};

export default AppointmentProperties;
