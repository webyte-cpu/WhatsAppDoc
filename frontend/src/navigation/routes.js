import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useAuth } from "../screens/auth/utils/authProvider";
import customFonts from "../../themes/custom-fonts";
import AppLoading from "expo-app-loading";
import AuthNavigator from "./navigatorStacks/authNavigator";
import AdminDrawerStack from "./navigatorStacks/adminStack";
import UserDrawerStack from "./navigatorStacks/userDrawer";
import enums from "../../helpers/enums";
import LoadingScreen from "../components/loadingScreen";

const linking = {
  config: {
    screens: {
      SignIn: "/signin",
      Signup: "/signup",
      ForgotPass: "/forgotpassword",
      AdminHome: "/admin",
      Home: "/home",
      Search: "/search",
      Schedules: "/schedules",
      Notification: "/notif",
      Profile: "/profile",
    },
  },
};

const AppNavigator = () => {
  const { appState } = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  if (appState.isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {appState.user == null ? (
          <AuthNavigator />
        ) : appState.user.role === enums.role.ADMIN ? (
          <AdminDrawerStack />
        ) : (
          <UserDrawerStack />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
//auth.token.role === enums.role.ADMIN ? <AdminDrawerStack /> :
