import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { Drawer, DrawerItem, IndexPath, Icon } from "@ui-kitten/components";
import { useAuth } from "../../screens/auth/utils/authProvider";
import TabStack from "./tabStack";
import ProfileStackScreen from "./profileStack";
import ProfileHeader from "../../components/drawer/drawerHeader";
import breakpoints from "../../utils/breakpoints";

const DrawerNav = createDrawerNavigator();

const HomeIcon = (props) => <Icon {...props} name='home' />;
const ProfileIcon = (props) => <Icon {...props} name='person' />;
const LogoutIcon = (props) => <Icon {...props} name='log-out-outline' />;

const DrawerContent = (props) => {
  const auth = useAuth();

  return (
    <Drawer
      header={() => <ProfileHeader {...props} />}
      appearance="noDivider"
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) =>
        props.navigation.navigate(props.state.routeNames[index.row])
      }
    >
      <DrawerItem title="Home" accessoryLeft={HomeIcon} />
      <DrawerItem title="Profile" accessoryLeft={ProfileIcon}/>
      <DrawerItem title="Logout" onPress={() => auth.logout()} accessoryLeft={LogoutIcon} />
    </Drawer>
  );
};

const DrawerStack = ({ navigation }) => {
  const dimensions = useWindowDimensions();

  return (
    <DrawerNav.Navigator
      drawerType={dimensions.width >= breakpoints.lg ? "permanent" : "front"}
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{ width: 240 }}
    >
      <DrawerNav.Screen
        name="TabStack"
        component={TabStack}
        options={{ title: "Home" }}
      />
      <DrawerNav.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{ title: "Profile" }}
      />
    </DrawerNav.Navigator>
  );
};

export default DrawerStack;
