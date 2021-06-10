import React, { useLayoutEffect, useState, useEffect } from "react";
import { View } from "react-native";
import { Button, IndexPath, Text, useTheme, Card } from "@ui-kitten/components";
import { useAuth } from "../auth/utils/authProvider";
import { AppRoute } from "../../navigation/app-routes";
import Searchbar from "../search/search";
import customStyle from "../../../themes/styles";
import ResendForm from "./resendForm";
import enums from "../../../helpers/enums";
import { registerForPushNotificationsAsync } from '../../notification/notification'
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from './utils/queries'

const HomePage = ({ navigation, route }) => {
  const { appState } = useAuth();
  const [ updateUser, { errorMutate }] = useMutation(UPDATE_USER);
  const updateUserPushToken = (pushToken) => {
    updateUser({
      variables: {
        pushToken: pushToken,
      },
    });
  };

  if (errorMutate) {
    console.error(errorMutate);
  }


  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(token => updateUserPushToken(token)) 
    .catch(err => console.log('err',err));
  }, []);

  return (
    <View style={customStyle.contentFill}>
      {appState.user.role === enums.role.DOCTOR &&
      appState.user.verificationStatus ===
        enums.verificationStatus.UNVERIFIED ? (
        <ResendForm navigation={navigation} />
      ) : (
        <></>
      )}
      <Text testID="welcome-header" category="h1" style={{ marginBottom: 10 }}>
        Welcome {appState.user.firstName}!
      </Text>
      {appState.user.role === enums.role.PATIENT ? (
        <Searchbar navigation={navigation} route={route} />
      ) : (
        <></>
      )}
       {/* <Searchbar navigation={navigation} route={route} /> */}
    </View>
  );
};

export default HomePage;
