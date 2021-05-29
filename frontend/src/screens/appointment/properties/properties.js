import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Tab,
  TabBar,
  useTheme,
  Modal,
  Card,
  Spinner,
} from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import customStyle from "../../../../themes/styles";
import About from "./about";
import Availability from "./availability";
import Limits from "./limits";
import { usePropertiesForm } from "./formProvider";
import LoadingScreen from "../../../components/loadingScreen";

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

const AlertModal = ({ open }) => {
  return (
    <Modal
      visible={open}
      style={customStyle.modalContainer}
      backdropStyle={customStyle.backdrop}
      style={{ justifyContent: "center", alignSelf: "center" }}
    >
      <Card style={{ width: "fit-content" }}>
        <Spinner size="large" status="primary" />
      </Card>
    </Modal>
  );
};

const AppointmentProperties = ({ navigation, route }) => {
  const theme = useTheme();
  const form = usePropertiesForm();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.setOptions({
        title: form.initialValues.clinicName,
      });
    });

    return unsubscribe;
  }, [navigation]);

  console.log(form);
  return (
    <View style={{ flex: 1 }}>
      <AlertModal open={form.isLoading} />
      <Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        style={{ backgroundColor: theme["color-primary-light-600"] }}
      >
        <Screen name="About" component={About} />
        <Screen name="Availability" component={Availability} />
        <Screen name="Limits" component={Limits} />
      </Navigator>
    </View>
  );
};

export default AppointmentProperties;
