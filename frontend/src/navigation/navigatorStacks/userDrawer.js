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
import { UPDATE_USER } from "../../screens/home/utils/queries"
import {useMutation} from '@apollo/client'
 
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
  const {appState} = useAuth();
  const [ updateUser, { errorMutate }] = useMutation(UPDATE_USER);
  const updateUserPushToken = (uid, pushToken) => {
    updateUser({
      variables: {
        uid: uid,
        pushToken: pushToken,
      },
    });
  };

  if (errorMutate) {
    console.log(errorMutate);
  }

  const logout = () => {
    updateUserPushToken(appState.user.uid,null)
    auth.logout();
  }

  return (
    <Drawer
      header={() => <ClickableProfileHeader {...props} />}
      appearance="noDivider"
      selectedIndex={new IndexPath(props.state.index)}
      onSelect={(index) =>
        props.navigation.navigate(props.state.routeNames[index.row])
      }
      footer={() => <DrawerItem title="Logout" onPress={() => logout()} accessoryLeft={Icons.LOGOUT} />}
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
