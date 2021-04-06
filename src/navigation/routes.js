import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoute } from './app-routes';
import { useFonts } from 'expo-font';
import { useAuth } from '../screens/auth/utils/authProvider';
import customFonts from '../../themes/custom-fonts';
import AppLoading from 'expo-app-loading';
import LoginScreen from '../screens/auth/login';
import SignupScreen from '../screens/auth/signup';
import ForgotPassword from '../screens/auth/forgotPassword';
import HomeScreen from '../screens/home/home';
import ProfileScreen from '../screens/profile/profile';
import Bookmarks from '../screens/bookmarks/bookmarks';
import MedRec from '../screens/medical_record/medRec'

const { Navigator, Screen } = createStackNavigator();

const linking = {
  config: {
    Home: 'home',
    Login: '',
    Signup: 'signup',
    ForgotPass: 'forgotpass',
    Profile: 'profile',
    Bookmarks: 'bookmarks',
    MedRec: 'medrec'
  },
};

const authScreens = (
  <>
    <Screen name={AppRoute.LOGIN} component={LoginScreen} />
    <Screen name={AppRoute.SIGNUP} component={SignupScreen} />
    <Screen name={AppRoute.FORGOT_PASS} component={ForgotPassword} />
  </>
);

const homeScreen = (
  <>
    <Screen name={AppRoute.HOME} component={HomeScreen} />
    <Screen name={AppRoute.PROFILE} component={ProfileScreen} />
    <Screen name={AppRoute.BOOKMARKS} component={Bookmarks} />
    <Screen name={AppRoute.MEDICAL_REC} component={MedRec} />
  </>
);

const AppNavigator = () => {
  const auth = useAuth();
  const [fontsLoaded] = useFonts(customFonts);

  if (fontsLoaded && auth.state.isLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Navigator headerMode="none">
          {auth.state.token == null ? authScreens : homeScreen}
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
