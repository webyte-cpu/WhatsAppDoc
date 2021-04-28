import React from "react";
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Spinner testID="loading" status="primary" size="giant"></Spinner>
    </View>
  );
};

export default LoadingScreen;
