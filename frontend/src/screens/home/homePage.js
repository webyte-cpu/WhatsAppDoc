import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Button, IndexPath, Text, useTheme, Card } from "@ui-kitten/components";
import { useAuth } from "../auth/utils/authProvider";
import { AppRoute } from "../../navigation/app-routes";
import Searchbar from "../search/search";
import customStyle from "../../../themes/styles";
import ResendForm from "./resendForm";
import enums from "../../../helpers/enums";

const HomePage = ({ navigation, route }) => {
  const { appState } = useAuth();

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
    </View>
  );
};

export default HomePage;
