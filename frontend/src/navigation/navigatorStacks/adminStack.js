import React from "react";
import { View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../../screens/auth/utils/authProvider";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import DrawerStack from "./drawerStack";
import Admin from "../../screens/Admin/admin";
import Icons from "../../utils/icons";
import ProfileHeader from "../../components/drawer/drawerHeader";

const AdminDrawer = createDrawerNavigator();
const AdminStack = createStackNavigator();

const AdminNavigator = (props) => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="admin"
        component={Admin}
        options={{
          headerLeft: () => <DrawerMenuBtn props={props} />
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
