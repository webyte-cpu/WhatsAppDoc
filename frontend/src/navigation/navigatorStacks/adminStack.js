import React from "react";
import { View, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../../screens/auth/utils/authProvider";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
import { AppRoute } from "../app-routes";
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import DrawerStack from "./drawerStack";
import Admin from "../../screens/Admin/admin";
import Icons from "../../utils/icons";
import ProfileHeader from "../../components/drawer/drawerHeader";
import breakpoints from "../../utils/breakpoints";

const AdminDrawer = createDrawerNavigator();
const AdminStack = createStackNavigator();

const AdminNavigator = (props) => {
  const dimensions = useWindowDimensions();

  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name={AppRoute.ADMIN}
        component={Admin}
        options={{
          headerLeft: () => {
            if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
          },
          headerTitle: 'Verification Requests'
        }}
      />
    </AdminStack.Navigator>
  );
};

const DrawerContent = (props) => {
  const auth = useAuth();

  return (
    <Drawer
      header={() => <ProfileHeader />}
      appearance="noDivider"
      selectedIndex={new IndexPath(props.state.index)}
      footer={() => <DrawerItem title="Logout" onPress={() => auth.logout()} accessoryLeft={Icons.LOGOUT} />}
    >
      <DrawerItem title="Home" accessoryLeft={Icons.HOME} />
    </Drawer>
  );
};

const AdminDrawerStack = () => {
  const adminDrawerScreens = (
    <>
      <AdminDrawer.Screen
        name="AdminHome"
        component={AdminNavigator}
        options={{ title: "Home" }}
      />
    </>
  );

  return (
    <DrawerStack
      children={adminDrawerScreens}
      drawerContent={(props) => <DrawerContent {...props} />}
    />
  );
};

export default AdminDrawerStack;
