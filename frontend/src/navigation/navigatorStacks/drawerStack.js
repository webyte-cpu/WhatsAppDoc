import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import breakpoints from "../../utils/breakpoints";

const DrawerNav = createDrawerNavigator();

const DrawerStack = ({ navigation, children, drawerContent }) => {
  const dimensions = useWindowDimensions();

  return (
    <DrawerNav.Navigator
      drawerType={dimensions.width >= breakpoints.lg ? "permanent" : "front"}
      drawerContent={drawerContent}
      drawerStyle={{ width: 240 }}
    >
      {children}
    </DrawerNav.Navigator>
  );
};

export default DrawerStack;