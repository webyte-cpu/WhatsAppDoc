import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer, DrawerItem, IndexPath, Icon } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import ProfileHeader from "../../components/drawer/drawerHeader";
import { useAuth } from "../../screens/auth/utils/authProvider";
import Icons from "../../utils/icons";
import DrawerStack from "./drawerStack";
import ProfileStackScreen from "./profileStack";
import TabStack from "./tabStack";
import RequestStackScreen from "./requestStack"
import { AppRoute } from "../app-routes";

const UserDrawer = createDrawerNavigator();

const ClickableProfileHeader = ({ navigation }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => navigation.navigate("ProfileStack")}
  >
    <ProfileHeader />
  </TouchableOpacity>
)

const DrawerContent = (props) => {
  const auth = useAuth();

  return (
    <Drawer
      header={() => <ClickableProfileHeader {...props} />}
      appearance="noDivider"
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) =>
        props.navigation.navigate(props.state.routeNames[index.row])
      }
      footer={() => <DrawerItem title="Logout" onPress={() => auth.logout()} accessoryLeft={Icons.LOGOUT} />}
    >
      <DrawerItem title="Home" accessoryLeft={Icons.HOME} />
      <DrawerItem title="Profile" accessoryLeft={Icons.PROFILE} />
      <DrawerItem title="Request" accessoryLeft={Icons.REQUEST} />
    </Drawer>
  );
};

const UserDrawerStack = () => {
  const userDrawerScreens = (
    <>
      <UserDrawer.Screen
        name="TabStack"
        component={TabStack}
        options={{ title: "Home" }}
      />
      <UserDrawer.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{ title: "Profile" }}
      />
      <UserDrawer.Screen
        name={AppRoute.REQUEST}
        component={RequestStackScreen}
        options={{ title: "Requests" }}
      />
    </>
  );
  return <DrawerStack children={userDrawerScreens} drawerContent={(props) => <DrawerContent {...props} />} />;
};

export default UserDrawerStack;
