import * as React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './themes/custom-theme.json';
import AppNavigator from './src/navigation/navigation';
import { AppRoute } from './src/navigation/app-routes';
import customFonts from './themes/custom-fonts';
import { AuthContext } from './src/screens/auth/context';
import HomeScreen from './src/screens/home/home';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  const [fontsLoaded] = useFonts(customFonts);

  const initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {

      const userToken = String(foundUser[0].userToken);
      const userEmail = foundUser[0].userEmail;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      alert(`user token: ${userToken}`);
      dispatch({ type: 'LOGIN', id: userEmail, token: userToken });
    },
    signOut: async () => {

      try {
        await AsyncStorage.removeItem('userToken');
      } catch (err) {
        console.error(err);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    },

  }), []);


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      userToken = null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // console.log('user token: ', userToken);
      alert(`user token: ${userToken}`);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

    };

    bootstrapAsync();
  }, []);

  if (!fontsLoaded && state.isLoading) {
    return <AppLoading />
  }


  return (
    <>
      <AuthContext.Provider value={authContext}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          {state.userToken !== null ? (
            <HomeScreen />
          )
            :
            <AppNavigator initialRouteName={AppRoute.LOGIN.name} />
          }
        </ApplicationProvider>
      </AuthContext.Provider>
    </>
  )
};

export default App;
