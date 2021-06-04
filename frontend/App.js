import React, { useState, useEffect, useRef } from 'react';
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./themes/custom-theme.json";
import AppNavigator from "./src/navigation/routes";
import { AuthProvider } from "./src/screens/auth/utils/authProvider";
import { StatusBar } from "expo-status-bar";
import ApolloClientProvider from "./apolloClient";
import * as Notifications from 'expo-notifications';

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token)) //mutation → add pushtoken to db
      .catch(err => console.log('err',err));

    //Listeners registered by this method will be called whenever a notification is received while the app is running.
    notificationListener.current = Notifications.addNotificationReceivedListener( notification => {
      console.log(notification.request.content) 
      // setNotification(notification);
    });
    
    //Listeners registered by this method will be called whenever a user interacts with a notification (eg. taps on it).
    responseListener.current = Notifications.addNotificationResponseReceivedListener( response => {
      const screen = response.notification.request.content.data.navigate
      console.log('navigate to:', screen)
      // navigation.navigate(screen)
    });

    return () => {
      // Clean up the event listeners
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
      <AuthProvider>
        <ApolloClientProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <StatusBar translucent={true} />
            <AppNavigator />
          </ApplicationProvider>
        </ApolloClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
